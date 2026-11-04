/**
 * Structured data that tells search engines what a page is about (see src/seo.ts).
 * "<" is escaped so no text inside it can close the script tag early.
 */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
