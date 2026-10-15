import { buildMetadata } from "@/lib/seo/metadata";
import { LEARN_PAGES } from "@/lib/seo/learn";
import { SITE } from "@/lib/seo/site";

// A plain string title here would reset the root "%s | KalbaLab" template for
// every child route, so restate it explicitly.
export const metadata = {
  ...buildMetadata(LEARN_PAGES.grammar),
  title: { absolute: `${LEARN_PAGES.grammar.title} | ${SITE.name}`, template: `%s | ${SITE.name}` },
};

export default function GrammarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
