"use client";

import { useEffect, useRef } from "react";
import { markBox, markColors, markHole, markOutline } from "@/brand/mark";
import { Mark } from "./Logo";

/**
 * The Softro logo as a real 3D model: the mark given thickness, rounded edges and a crimson
 * lacquer finish, lit by a small virtual photo studio (soft reflections and real shadows),
 * turning slowly with small building blocks drifting around it.
 * - It turns toward the pointer, can be dragged round, and spins when tapped.
 * - As the page scrolls, it turns away and the blocks spread out.
 * - `solo` shows the mark on its own, without the blocks, framed close in a portrait box
 *   (used on the About and 404 pages).
 *
 * Kept light on purpose:
 * - The flat logo shows straight away. three.js (the 3D library) is only downloaded once
 *   the page is idle, and the model then fades in over the logo.
 * - It only draws while it is on screen and the tab is visible.
 * - Visitors who ask for less motion get one still frame.
 * - If the device cannot do 3D, the flat logo simply stays.
 */
export function Hero3D({ hint }: { hint: string }) {
  return <LogoModel hint={hint} className="hero3d" />;
}

export function LogoModel({ hint, solo = false, className = "" }: { hint?: string; solo?: boolean; className?: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!box || !canvas) return;
    let cancelled = false;
    let dispose = () => {};

    async function start(box: HTMLDivElement, canvas: HTMLCanvasElement) {
      const [T, { RoundedBoxGeometry }, { toCreasedNormals }] = await Promise.all([
        import("three"),
        import("three/examples/jsm/geometries/RoundedBoxGeometry.js"),
        import("three/examples/jsm/utils/BufferGeometryUtils.js"),
      ]);
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
      renderer.toneMappingExposure = 1.05;
      // Soft shadows, so the blocks shade the mark as they pass in front of the light.
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = T.PCFSoftShadowMap;
      dispose = () => renderer.dispose();

      const scene = new T.Scene();

      // A small photo studio, rendered once into a reflection map: softboxes and strip lights in a dark room.
      // This is what gives the lacquer its real-looking highlights along the rounded edges.
      const studio = new T.Scene();
      const studioPart = (geometry: InstanceType<typeof T.PlaneGeometry | typeof T.SphereGeometry>, color: number, strength: number, at: [number, number, number]) => {
        const mesh = new T.Mesh(geometry, new T.MeshBasicMaterial({ color: new T.Color(color).multiplyScalar(strength), side: T.DoubleSide }));
        mesh.position.set(...at);
        mesh.lookAt(0, 0, 0);
        studio.add(mesh);
      };
      studioPart(new T.SphereGeometry(16, 24, 12), 0x221f24, 1, [0, 0, 0]); // the dark room
      studioPart(new T.PlaneGeometry(9, 6), 0xffffff, 3.2, [0, 9, 1]); // overhead softbox
      studioPart(new T.PlaneGeometry(5, 7), 0xffffff, 7, [7, 3, 7]); // key softbox, front right
      studioPart(new T.PlaneGeometry(14, 7), 0xfff6f2, 0.9, [-3, -1, 10]); // broad, dim fill behind the camera
      studioPart(new T.PlaneGeometry(1.2, 10), 0xfff1ea, 4, [-9, 1, 2]); // tall strip, left
      studioPart(new T.PlaneGeometry(10, 1), 0xffffff, 2.4, [0, 4, -9]); // rim strip, behind
      studioPart(new T.PlaneGeometry(14, 14), 0x8a1022, 0.35, [0, -9, 0]); // warm crimson bounce from below
      const pmrem = new T.PMREMGenerator(renderer);
      const environment = pmrem.fromScene(studio, 0.03).texture;
      pmrem.dispose();
      studio.traverse((part) => {
        if (part instanceof T.Mesh) {
          part.geometry.dispose();
          part.material.dispose();
        }
      });
      scene.environment = environment;

      // One real light, matching the key softbox, that casts the shadows.
      const key = new T.DirectionalLight(0xffffff, 1.5);
      key.position.set(4, 6, 7);
      key.castShadow = true;
      key.shadow.mapSize.setScalar(small ? 1024 : 2048);
      Object.assign(key.shadow.camera, { left: -4.2, right: 4.2, top: 4.2, bottom: -4.2, near: 1, far: 22 });
      key.shadow.camera.updateProjectionMatrix();
      key.shadow.bias = -0.0004;
      key.shadow.normalBias = 0.025;
      const sky = new T.HemisphereLight(0xffffff, 0x2a1418, 0.35);
      scene.add(key, sky);

      const camera = new T.PerspectiveCamera(32, 1, 0.1, 50);
      // On its own, the camera comes closer so the mark fills its box.
      camera.position.set(0, 0, solo ? 10.2 : 11.5);

      // The mark, from the same outline as the logo file, given thickness and softly rounded edges.
      const scale = 4.5 / markBox.height;
      const centerX = markBox.x + markBox.width / 2;
      const centerY = markBox.y + markBox.height / 2;
      const place = ([x, y]: [number, number]) => new T.Vector2((x - centerX) * scale, (centerY - y) * scale);
      const shape = new T.Shape(markOutline.map(place));
      shape.holes.push(new T.Path(markHole.map(place)));
      const depth = 0.8;
      // The negative offset pulls the rounding back inside the outline, so the silhouette and the opening keep the logo's proportions.
      const extruded = new T.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.09, bevelSize: 0.075, bevelOffset: -0.045, bevelSegments: 7 });
      extruded.translate(0, 0, -depth / 2);
      // Smooth shading across the rounded edges, while the logo's corners stay crisp.
      const markGeometry = toCreasedNormals(extruded, Math.PI / 5);
      if (markGeometry !== extruded) extruded.dispose();
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

      // A faint, fine grain in how rough the surface is, so reflections break up slightly like on a real lacquered part.
      const grainSize = 128;
      const grainData = new Uint8Array(grainSize * grainSize * 4);
      let grainSeed = 11;
      const grainRandom = () => ((grainSeed = (grainSeed * 16807) % 2147483647) - 1) / 2147483646;
      for (let index = 0; index < grainSize * grainSize; index++) {
        const value = 205 + grainRandom() * 50;
        grainData.set([value, value, value, 255], index * 4);
      }
      const grain = new T.DataTexture(grainData, grainSize, grainSize);
      grain.wrapS = grain.wrapT = T.RepeatWrapping;
      grain.repeat.set(2.5, 2.5);
      grain.magFilter = T.LinearFilter;
      grain.minFilter = T.LinearMipmapLinearFilter;
      grain.generateMipmaps = true;
      grain.needsUpdate = true;

      // Crimson lacquer: a slightly soft colour coat under a hard, glassy clear coat.
      const lacquer = { roughness: 0.42, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.07, envMapIntensity: 1.1 };
      const markMaterial = new T.MeshPhysicalMaterial({ vertexColors: true, ...lacquer, roughnessMap: grain, specularIntensity: 0.6 });
      const mark = new T.Mesh(markGeometry, markMaterial);
      mark.castShadow = true;
      mark.receiveShadow = true;
      scene.add(mark);

      // A soft shadow on the "floor" below the mark, which grounds it.
      const shadowCanvas = document.createElement("canvas");
      shadowCanvas.width = shadowCanvas.height = 128;
      const shadowContext = shadowCanvas.getContext("2d");
      if (shadowContext) {
        const gradient = shadowContext.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, "rgba(0,0,0,0.55)");
        gradient.addColorStop(0.45, "rgba(0,0,0,0.22)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        shadowContext.fillStyle = gradient;
        shadowContext.fillRect(0, 0, 128, 128);
      }
      const shadowTexture = new T.CanvasTexture(shadowCanvas);
      const floorGeometry = new T.PlaneGeometry(solo ? 3.6 : 4.6, 2.4);
      const floorMaterial = new T.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false, toneMapped: false });
      const floor = new T.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = solo ? -2.6 : -2.85;
      scene.add(floor);
      await pause();
      if (cancelled) return;

      // Small building blocks drifting round the mark. Fixed "random" numbers, so every visit looks the same.
      const blockGeometry = new RoundedBoxGeometry(1, 1, 1, 4, 0.16);
      const blockMaterials = [
        new T.MeshPhysicalMaterial({ color: "#d92d42", ...lacquer, roughnessMap: grain }),
        // Glazed ceramic.
        new T.MeshPhysicalMaterial({ color: "#f3efe8", roughness: 0.45, clearcoat: 0.7, clearcoatRoughness: 0.15 }),
        // Brushed gunmetal.
        new T.MeshPhysicalMaterial({ color: "#8a8a94", roughness: 0.3, metalness: 0.9, roughnessMap: grain }),
      ];
      let seed = 7;
      const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
      const blocks = new T.Group();
      const drift = Array.from({ length: solo ? 0 : small ? 9 : 13 },(_, index) => {
        const mesh = new T.Mesh(blockGeometry, blockMaterials[index % 3]);
        mesh.scale.setScalar(0.16 + random() * 0.24);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
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
        // The floor shadow tightens and darkens as the mark dips, and fades as the page scrolls on.
        floor.scale.setScalar(1 - mark.position.y * 0.6);
        floorMaterial.opacity = (1 - mark.position.y * 1.5) * (1 - scrolled * 0.6);

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
        const width = box.clientWidth;
        const height = box.clientHeight;
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
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
        [markGeometry, blockGeometry, floorGeometry].forEach((geometry) => geometry.dispose());
        [markMaterial, floorMaterial, ...blockMaterials].forEach((material) => material.dispose());
        [grain, shadowTexture, environment].forEach((texture) => texture.dispose());
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
  }, [solo]);

  return (
    <div ref={boxRef} className={`model3d ${solo ? "model3d-solo" : ""} ${className}`} aria-hidden="true">
      <div className="model3d-poster">
        <Mark height={300} />
      </div>
      <canvas ref={canvasRef} />
      {hint ? <p className="model3d-hint label">{hint}</p> : null}
    </div>
  );
}
