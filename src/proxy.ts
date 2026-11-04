import { NextResponse, type NextRequest } from "next/server";

/**
 * Sends each page request to its language:
 * - /si and /si/... are the Sinhala pages and pass straight through.
 * - /en/... is redirected to the plain address, so English has one address per page.
 * - Everything else is English, served from the en pages without changing the address.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/si" || pathname.startsWith("/si/")) return NextResponse.next();

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip the API, Next.js internals and any file with an extension (images, fonts, robots.txt, sitemap.xml).
  matcher: ["/((?!api/|_next/|.*\\.[\\w]+$).*)"],
};
