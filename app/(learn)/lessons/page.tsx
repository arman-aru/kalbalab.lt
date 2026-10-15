import { SEO } from "@/components/seo/SEO";
import { courseLd } from "@/lib/seo/jsonld";
import { abs } from "@/lib/seo/site";
import { LEARN_PAGES, learnBreadcrumbLd } from "@/lib/seo/learn";
import LessonsClient from "./LessonsClient";

const page = LEARN_PAGES.lessons;

export default function LessonsPage() {
  return (
    <>
      <SEO
        blocks={[
          learnBreadcrumbLd(page),
          courseLd({
            id: `${abs(page.path)}#course`,
            url: abs(page.path),
            name: "Lithuanian A1 Course",
            description: page.description,
            educationalLevel: "A1",
            teaches: [
              "Lithuanian alphabet and pronunciation",
              "Lithuanian A1 grammar",
              "Everyday Lithuanian conversation",
              "Lithuanian reading comprehension",
              "Lithuanian A1 vocabulary",
            ],
            hasCourseInstance: { courseMode: "online" },
            offers: { price: 0, priceCurrency: "EUR" },
          }),
        ]}
      />
      <LessonsClient />
    </>
  );
}
