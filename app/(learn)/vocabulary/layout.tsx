import { SEO } from "@/components/seo/SEO";
import { buildMetadata } from "@/lib/seo/metadata";
import { definedTermSetLd } from "@/lib/seo/jsonld";
import { abs } from "@/lib/seo/site";
import { LEARN_PAGES, learnBreadcrumbLd } from "@/lib/seo/learn";
import { vocabularyData } from "@/data/vocabulary";

const page = LEARN_PAGES.vocabulary;

export const metadata = buildMetadata(page);

const TERMS_LD = definedTermSetLd({
  url: abs(page.path),
  name: "Lithuanian A1 vocabulary",
  description: page.description,
  terms: vocabularyData.map((w) => ({ name: w.lithuanian, description: w.english })),
});

export default function VocabularyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SEO blocks={[learnBreadcrumbLd(page), TERMS_LD]} />
      {children}
    </>
  );
}
