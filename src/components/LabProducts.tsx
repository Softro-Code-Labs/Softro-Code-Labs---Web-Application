import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/content";
import type { LabAppSlug } from "@/content/projects";
import { localize, type Lang } from "@/i18n";

type ProductId = "swift" | LabAppSlug;

/**
 * Switches between the Lab's products: Swift Converter Hub first, then the commercial apps.
 * The one on show is raised and marked current; the others link to their pages.
 * Used under the Lab intro and at the top of each app's page.
 */
export function LabProducts({ lang, current, className = "" }: { lang: Lang; current: ProductId; className?: string }) {
  const { ui, labApps } = getContent(lang);
  const t = ui.lab.products;
  const products: { id: ProductId; name: string; meta: string; href: string; logo: React.ReactNode }[] = [
    {
      id: "swift",
      name: "Swift Converter Hub",
      meta: t.free,
      href: "/lab",
      logo: (
        <span className="lab-switch-logo bg-white">
          <Image src="/work/sch-logo.svg" width={26} height={26} alt="" unoptimized />
        </span>
      ),
    },
    ...labApps.map((app) => ({
      id: app.slug,
      name: app.name,
      meta: t.commercial,
      href: `/lab/${app.slug}`,
      logo: <Image className="lab-switch-logo" src={app.icon} width={36} height={36} alt="" />,
    })),
  ];

  return (
    <nav aria-label={t.label} className={className}>
      <ul className="lab-switch">
        {products.map((product) => {
          const body = (
            <>
              {product.logo}
              <span className="min-w-0">
                <span lang="en">{product.name}</span>
                <small>{product.meta}</small>
              </span>
            </>
          );
          return (
            <li key={product.id}>
              {product.id === current ? (
                <span className="lab-switch-item" aria-current="true">
                  {body}
                </span>
              ) : (
                <Link className="lab-switch-item" href={localize(lang, product.href)}>
                  {body}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
