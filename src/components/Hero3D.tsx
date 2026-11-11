"use client";

import { useEffect, useRef } from "react";
import { markBox, markColors, markHole, markOutline } from "@/brand/mark";
import { Mark } from "./Logo";

/**
 * The Softro logo as a real 3D model: the mark given thickness, turning slowly,
 * with small building blocks drifting around it.
 * - It turns toward the pointer, can be dragged round, and spins when tapped.
 * - As the page scrolls, it turns away and the blocks spread out.
 *
 * Kept light on purpose:
 * - The flat logo shows straight away. three.js (the 3D library) is only downloaded once
 *   the page is idle, and the model then fades in over the logo.
 * - It only draws while it is on screen and the tab is visible.
 * - Visitors who ask for less motion get one still frame.
 * - If the device cannot do 3D, the flat logo simply stays.
 */
export function Hero3D({ hint }: { hint: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    let cancelled = false;
    let dispose = () => {};

    async function start(box: HTMLDivElement, canvas: HTMLCanvasElement) {
      const [T, { RoundedBoxGeometry }] = await Promise.all([import("three"), import("three/examples/jsm/geometries/RoundedBoxGeometry.js")]);
      // Setting up is split into short steps with a pause between them, so the page never freezes while it happens.
      const pause = () => new Promise((resolve) => setTimeout(resolve, 0));
      await pause();
      if (cancelled) return;

      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.matchMedia("(max-width: 1023px)").matches;
      const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
      // Neutral tone mapping keeps the crimson rich instead of washing it out to pink.
      renderer.toneMapping = T.NeutralToneMapping;
      dispose = () => renderer.dispose();

      const scene = new T.Scene();
      // Four plain lights (sky, key, fill and rim). Cheaper to set up than a reflected room, and it keeps the crimson true.
      const sky = new T.HemisphereLight(0xffffff, 0x3a2025, 1.5);
      const key = new T.DirectionalLight(0xffffff, 2.6);
      key.position.set(3, 5, 6);
      const fill = new T.DirectionalLight(0xffe9e4, 0.9);
      fill.position.set(-6, -1, 4);
      const rim = new T.DirectionalLight(0xffffff, 1.4);
      rim.position.set(-3, 4, -6);
      scene.add(sky, key, fill, rim);

      const camera = new T.PerspectiveCamera(32, 1, 0.1, 50);
      camera.position.set(0, 0, 11.5);

      // The mark, from the same outline as the logo file, given thickness.
      const scale = 4.5 / markBox.height;
      const centerX = markBox.x + markBox.width / 2;
      const centerY = markBox.y + markBox.height / 2;
      const place = ([x, y]: [number, number]) => new T.Vector2((x - centerX) * scale, (centerY - y) * scale);
      const shape = new T.Shape(markOutline.map(place));
      shape.holes.push(new T.Path(markHole.map(place)));
      const depth = 0.8;
      const markGeometry = new T.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 4 });
      markGeometry.translate(0, 0, -depth / 2);
      // The logo's own colours: deep crimson at the top, running to bright crimson at the bottom.
      const positions = markGeometry.getAttribute("position");
      const colors = new Float32Array(positions.count * 3);
      const deep = new T.Color(markColors.deep);
      const bright = new T.Color(markColors.bright);
      const mixed = new T.Color();
      for (let index = 0; index < positions.count; index++) {
        const logoY = centerY - positions.getY(index) / scale;
        const amount = Math.min(Math.max((logoY - markColors.from) / (markColors.to - markColors.from), 0), 1);
        mixed.copy(deep).lerp(bright, amount);
        colors.set([mixed.r, mixed.g, mixed.b], index * 3);
      }
      markGeometry.setAttribute("color", new T.BufferAttribute(colors, 3));
      const gloss = { roughness: 0.34, metalness: 0, clearcoat: 0.6, clearcoatRoughness: 0.3 };
      const markMaterial = new T.MeshPhysicalMaterial({ vertexColors: true, ...gloss });
      const mark = new T.Mesh(markGeometry, markMaterial);
      scene.add(mark);
      await pause();
      if (cancelled) return;

      // Small building blocks drifting round the mark. Fixed "random" numbers, so every visit looks the same.
      const blockGeometry = new RoundedBoxGeometry(1, 1, 1, 3, 0.16);
      const blockMaterials = [
        new T.MeshPhysicalMaterial({ color: "#d92d42", ...gloss }),
        new T.MeshStandardMaterial({ color: "#f3efe8", roughness: 0.5 }),
        new T.MeshStandardMaterial({ color: "#3d3d45", roughness: 0.5 }),
      ];
      let seed = 7;
      const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
      const blocks = new T.Group();
      const drift = Array.from({ length: small ? 9 : 13 }, (_, index) => {
        const mesh = new T.Mesh(blockGeometry, blockMaterials[index % 3]);
        mesh.scale.setScalar(0.16 + random() * 0.24);
        blocks.add(mesh);
        return {
          mesh,
          angle: (index / 13) * Math.PI * 2 + random() * 0.6,
          radius: 2.35 + random() * 0.75,
          height: (random() - 0.5) * 4.4,
          speed: 0.05 + random() * 0.09,
          phase: random() * 6,
          turn: 0.2 + random() * 0.5,
        };
      });
      scene.add(blocks);
      // Prepare the materials in the background where the browser can, instead of during the first frame.
      await renderer.compileAsync(scene, camera).catch(() => {});
      if (cancelled) return;

      // State. "spread" is how far the blocks are pushed out: 0 at rest, 1 fully out.
      let spread = calm ? 0 : 1.2;
      let spreadSpeed = 0;
      let pointerX = 0;
      let pointerY = 0;
      let lookX = 0;
      let lookY = 0;
      // The mark starts turned away and swings round to face the visitor.
      let yaw = calm ? 0 : -2.4;
      let yawSpeed = 0;
      let dragging = false;
      let moved = 0;
      let lastX = 0;
      let time = 0;
      let previous = 0;
      let frame = 0;
      let inView = true;
      let ready = false;

      function pose(dt: number) {
        time += dt;
        const rect = box.getBoundingClientRect();
        const scrolled = Math.min(Math.max(-rect.top / rect.height + 0.12, 0), 1);

        // A slightly springy ease, so everything settles with a small bounce.
        spreadSpeed += ((scrolled * 0.9 - spread) * 58 - spreadSpeed * 10.5) * dt;
        spread += spreadSpeed * dt;
        lookX += (pointerX - lookX) * Math.min(1, dt * 5);
        lookY += (pointerY - lookY) * Math.min(1, dt * 5);
        if (!dragging) {
          yaw += yawSpeed * dt;
          yawSpeed *= Math.exp(-dt * 2.2);
          // After a spin, come to rest facing the front again.
          const rest = Math.round(yaw / (Math.PI * 2)) * Math.PI * 2;
          yaw += (rest - yaw) * Math.min(1, dt * 1.6);
        }

        const sway = calm ? 0 : Math.sin(time * 0.45) * 0.26;
        mark.rotation.set(0.12 + lookY * 0.3 + (calm ? 0 : Math.sin(time * 0.7) * 0.04), -0.45 + sway + lookX * 0.55 + yaw + scrolled * 0.9, 0);
        mark.position.y = calm ? 0 : Math.sin(time * 0.9) * 0.08;
        mark.scale.setScalar(1 - Math.max(0, spread) * 0.1);

        blocks.rotation.y = (lookX * 0.55 + yaw) * 0.35;
        blocks.rotation.x = lookY * 0.12;
        for (const item of drift) {
          const angle = item.angle + time * item.speed;
          const radius = item.radius * (1 + Math.max(0, spread) * 0.3);
          item.mesh.position.set(Math.cos(angle) * radius, item.height + Math.sin(time * 0.6 + item.phase) * 0.16, Math.sin(angle) * radius * 0.7);
          item.mesh.rotation.set(time * item.turn * 0.5 + item.phase, time * item.turn + item.phase, 0);
        }
      }

      function draw(now: number) {
        frame = 0;
        const dt = Math.min((now - previous) / 1000, 0.05);
        previous = now;
        pose(dt);
        renderer.render(scene, camera);
        if (!ready) {
          ready = true;
          box.setAttribute("data-ready", "");
        }
        if (!calm) schedule();
      }
      function schedule() {
        if (!frame && inView && !document.hidden) {
          previous = performance.now();
          frame = requestAnimationFrame(draw);
        }
      }

      function resize() {
        const size = box.clientWidth;
        if (!size) return;
        renderer.setSize(size, size, false);
        if (calm) requestAnimationFrame(draw);
      }
      const sizes = new ResizeObserver(resize);
      sizes.observe(box);
      resize();

      const views = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        schedule();
      });
      views.observe(box);

      const onPointer = (event: PointerEvent) => {
        if (event.pointerType === "mouse") {
          pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
          pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
        }
        if (dragging) {
          const dx = event.clientX - lastX;
          lastX = event.clientX;
          moved += Math.abs(dx);
          yaw += dx * 0.009;
          yawSpeed = dx * 0.5;
        }
      };
      const onDown = (event: PointerEvent) => {
        dragging = true;
        moved = 0;
        lastX = event.clientX;
      };
      const onUp = () => {
        // A tap (not a drag) sends the mark round once and nudges the blocks outward.
        if (dragging && moved < 6) {
          yawSpeed = 13;
          spreadSpeed = 9;
        }
        dragging = false;
      };
      const onVisible = () => schedule();
      if (!calm) {
        window.addEventListener("pointermove", onPointer, { passive: true });
        box.addEventListener("pointerdown", onDown, { passive: true });
        window.addEventListener("pointerup", onUp, { passive: true });
        window.addEventListener("pointercancel", onUp, { passive: true });
        document.addEventListener("visibilitychange", onVisible);
      }
      schedule();

      dispose = () => {
        cancelAnimationFrame(frame);
        sizes.disconnect();
        views.disconnect();
        window.removeEventListener("pointermove", onPointer);
        box.removeEventListener("pointerdown", onDown);
        window.removeEventListener("pointerup", onUp);
        window.removeEventListener("pointercancel", onUp);
        document.removeEventListener("visibilitychange", onVisible);
        [markGeometry, blockGeometry].forEach((geometry) => geometry.dispose());
        [markMaterial, ...blockMaterials].forEach((material) => material.dispose());
        renderer.dispose();
      };
    }

    // Wait until the page is idle, so the 3D library never competes with the first paint.
    const run = () => start(box, canvas).catch(() => {});
    const idle = typeof window.requestIdleCallback === "function";
    const handle = idle ? window.requestIdleCallback(run, { timeout: 2500 }) : window.setTimeout(run, 400);
    return () => {
      cancelled = true;
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      dispose();
    };
  }, []);

  return (
    <div ref={boxRef} className="hero3d" aria-hidden="true">
      <div className="hero3d-poster">
        <Mark height={300} />
      </div>
      <canvas ref={canvasRef} />
      <p className="hero3d-hint label">{hint}</p>
    </div>
  );
}
