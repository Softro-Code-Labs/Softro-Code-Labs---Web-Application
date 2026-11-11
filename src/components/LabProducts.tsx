import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/content";
import { localize, type Lang } from "@/i18n";

type ProductId = "swift" | "surelane";

/**
 * Switches between the Lab's products. The one on show is raised and marked current;
 * the other is a link to its page. Used under the Lab intro and at the top of each product's page.
 */
export function LabProducts({ lang, current, className = "" }: { lang: Lang; current: ProductId; className?: string }) {
  const t = getContent(lang).ui.lab.products;
  const products = [
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
    {
      id: "surelane",
      name: "Surelane",
      meta: t.commercial,
      href: "/lab/surelane",
      logo: <Image className="lab-switch-logo" src="/work/surelane-icon.webp" width={36} height={36} alt="" />,
    },
  ] satisfies { id: ProductId; name: string; meta: string; href: string; logo: React.ReactNode }[];

  return (
    <nav aria-label={t.label} className={className}>
      <ul className="lab-switch">
        {products.map((product) => {
          const body = (
            <>
              {product.logo}
              <span>
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
