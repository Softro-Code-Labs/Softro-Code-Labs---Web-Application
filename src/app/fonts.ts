import localFont from "next/font/local";

/**
 * The site's Latin typefaces, shared by the page layout and the 404 page. Sinhala fonts are in globals.css.
 * - Geist: all text and headings (one file holds every weight).
 * - Instrument Serif Italic: the highlighted words in headings.
 * - Geist Mono: small labels and numbers.
 */
const geist = localFont({
  src: "../fonts/geist-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
});

const serif = localFont({
  src: "../fonts/instrument-serif-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

/* Only used for small labels, so it loads after the text fonts instead of ahead of them. */
const mono = localFont({
  src: "../fonts/geist-mono-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const fontClasses = `${geist.variable} ${serif.variable} ${mono.variable}`;

/* Runs before the page paints, so a saved or system light theme never flashes dark first. */
export const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){}`;
