import localFont from "next/font/local";

/** The site's two Latin typefaces, shared by the page layout and the 404 page. Sinhala fonts are in globals.css. */
const yaldevi = localFont({
  src: "../fonts/yaldevi-latin-600-normal.woff2",
  weight: "600",
  variable: "--font-yaldevi",
  display: "swap",
});

const schibsted = localFont({
  src: "../fonts/schibsted-grotesk-latin-wght-normal.woff2",
  weight: "400 900",
  variable: "--font-schibsted",
  display: "swap",
});

export const fontClasses = `${yaldevi.variable} ${schibsted.variable}`;

/* Runs before the page paints, so a saved or system light theme never flashes dark first. */
export const themeScript = `try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){}`;
