import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-(--gutter) py-24">
      <h1 className="display-xl">This page doesn&apos;t exist.</h1>
      <p className="lead mt-6 text-muted">The link may be old, or the address may have a typo.</p>
      <p className="mt-8">
        <Link className="btn" href="/">
          Go to the home page
        </Link>
      </p>
    </div>
  );
}
