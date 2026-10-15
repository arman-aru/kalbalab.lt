import { SEO } from "@/components/seo/SEO";
import { buildMetadata } from "@/lib/seo/metadata";
import { learningResourceLd } from "@/lib/seo/jsonld";
import { abs } from "@/lib/seo/site";
import { COURSE_PATH, LEARN_PAGES, learnBreadcrumbLd } from "@/lib/seo/learn";

const page = LEARN_PAGES.fundamentals;

export const metadata = buildMetadata(page);

export default function FundamentalsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SEO
        blocks={[
          learnBreadcrumbLd(page),
          learningResourceLd({
            url: abs(page.path),
            name: page.title,
            description: page.description,
            educationalLevel: "A1",
            teaches: "Lithuanian alphabet, pronunciation, numbers, days and months",
            learningResourceType: "Lesson",
            isPartOf: abs(COURSE_PATH),
          }),
        ]}
      />
      {children}
    </>
  );
}
