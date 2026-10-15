import { SEO } from "@/components/seo/SEO";
import { buildMetadata } from "@/lib/seo/metadata";
import { learningResourceLd } from "@/lib/seo/jsonld";
import { abs } from "@/lib/seo/site";
import { COURSE_PATH, LEARN_PAGES, learnBreadcrumbLd } from "@/lib/seo/learn";

const page = LEARN_PAGES.reading;

export const metadata = buildMetadata(page);

export default function ReadingLayout({ children }: { children: React.ReactNode }) {
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
            teaches: "Lithuanian A1 reading comprehension",
            learningResourceType: "Reading practice",
            isPartOf: abs(COURSE_PATH),
          }),
        ]}
      />
      {children}
    </>
  );
}
