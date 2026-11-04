"use client";

import { useEffect } from "react";

/**
 * Pointer effects for the whole site, from one set of listeners (no per-element scripts):
 * - [data-tilt] turns toward the pointer in 3D. Inside a [data-tilt-scope], the whole
 *   scope is the hover area. The value is the most it turns, in degrees.
 * - [data-spot] gets --sx/--sy, which the .spot class uses to draw a glow under the pointer.
 * It only writes CSS variables, at most once per frame, and only for a mouse or trackpad.
 * Tilting is off for visitors who ask for less motion.
 */
export function Motion() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    let tiltEl: HTMLElement | null = null;
    let tiltArea: HTMLElement | null = null;
    let tiltBox: DOMRect | null = null;
    let spotEl: HTMLElement | null = null;
    let spotBox: DOMRect | null = null;
    let x = 0;
    let y = 0;
    let frame = 0;

    const release = () => {
      if (tiltEl) {
        tiltEl.removeAttribute("data-active");
        tiltEl.style.setProperty("--tx", "0");
        tiltEl.style.setProperty("--ty", "0");
      }
      tiltArea?.style.setProperty("--hover", "0");
      tiltEl = null;
      tiltArea = null;
      tiltBox = null;
    };

    const draw = () => {
      frame = 0;
      if (tiltEl && tiltArea) {
        tiltBox ??= tiltArea.getBoundingClientRect();
        const px = Math.min(Math.max((x - tiltBox.left) / tiltBox.width, 0), 1);
        const py = Math.min(Math.max((y - tiltBox.top) / tiltBox.height, 0), 1);
        const most = Number(tiltEl.dataset.tilt) || 6;
        tiltEl.style.setProperty("--tx", ((px - 0.5) * 2 * most).toFixed(2));
        tiltEl.style.setProperty("--ty", ((0.5 - py) * 2 * most).toFixed(2));
        tiltArea.style.setProperty("--gx", `${(px * 100).toFixed(1)}%`);
        tiltArea.style.setProperty("--gy", `${(py * 100).toFixed(1)}%`);
        tiltArea.style.setProperty("--hover", "1");
      }
      if (spotEl) {
        spotBox ??= spotEl.getBoundingClientRect();
        spotEl.style.setProperty("--sx", `${Math.round(x - spotBox.left)}px`);
        spotEl.style.setProperty("--sy", `${Math.round(y - spotBox.top)}px`);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !fine.matches) return;
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      x = event.clientX;
      y = event.clientY;

      const scope = target.closest<HTMLElement>("[data-tilt-scope]");
      const nextTilt = reduce.matches ? null : scope ? scope.querySelector<HTMLElement>("[data-tilt]") : target.closest<HTMLElement>("[data-tilt]");
      if (nextTilt !== tiltEl) {
        release();
        if (nextTilt) {
          tiltEl = nextTilt;
          // Measure against an element that does not turn, so the angle cannot feed back on itself.
          tiltArea = scope ?? nextTilt.parentElement;
          tiltEl.setAttribute("data-active", "");
        }
      }

      const nextSpot = target.closest<HTMLElement>("[data-spot]");
      if (nextSpot !== spotEl) {
        spotEl = nextSpot;
        spotBox = null;
      }

      if ((tiltEl || spotEl) && !frame) frame = requestAnimationFrame(draw);
    };

    const onOut = (event: PointerEvent) => {
      // Leaving the window altogether.
      if (!event.relatedTarget) {
        release();
        spotEl = null;
      }
    };
    const forget = () => {
      tiltBox = null;
      spotBox = null;
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    window.addEventListener("scroll", forget, { passive: true });
    window.addEventListener("resize", forget, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onOut);
      window.removeEventListener("scroll", forget);
      window.removeEventListener("resize", forget);
      cancelAnimationFrame(frame);
      release();
    };
  }, []);

  return null;
}
