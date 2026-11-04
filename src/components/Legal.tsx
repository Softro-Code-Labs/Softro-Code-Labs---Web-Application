import type { ReactNode } from "react";

export function Legal({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="on-paper bg-paper px-(--gutter) py-16 text-night">
      <article className="mx-auto max-w-[680px] [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[32px] [&_h2]:font-semibold [&_p]:mt-3">
        <h1 className="display-l">{title}</h1>
        <p className="text-sm text-muted-paper">Last updated {updated}</p>
        {children}
      </article>
    </div>
  );
}
