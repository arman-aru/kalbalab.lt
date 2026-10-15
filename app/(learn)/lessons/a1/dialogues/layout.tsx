import { buildMetadata } from "@/lib/seo/metadata";
import { LEARN_PAGES } from "@/lib/seo/learn";
import { SITE } from "@/lib/seo/site";

// A plain string title here would reset the root "%s | KalbaLab" template for
// every child route, so restate it explicitly.
export const metadata = {
  ...buildMetadata(LEARN_PAGES.dialogues),
  title: { absolute: `${LEARN_PAGES.dialogues.title} | ${SITE.name}`, template: `%s | ${SITE.name}` },
};

export default function DialoguesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
