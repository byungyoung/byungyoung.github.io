import { site } from "@/content/site";

/**
 * Person schema for the two home pages. `jobTitle` deliberately carries the
 * factual role (`site.jobTitle`) rather than the positioning line the pages
 * lead with — structured data is read by machines that treat it as a claim
 * about employment.
 */
export function personSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    alternateName: site.nameEn,
    url: `${site.urls.canonical}/`,
    jobTitle: site.jobTitle,
    email: `mailto:${site.email}`,
    worksFor: {
      "@type": "Organization",
      name: site.worksFor,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: site.alumniOf,
    },
    sameAs: [site.urls.github, site.urls.linkedin],
  };
}
