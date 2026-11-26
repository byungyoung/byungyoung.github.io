import type { MetadataRoute } from "next";

import { cases } from "@/content/cases";
import { site } from "@/content/site";
import { casePath } from "@/lib/case-route";
import { GAME_PATHS } from "@/lib/game";
import { localizePath } from "@/lib/paths";

export const dynamic = "force-static";

/** Every public route, expressed as its bare English path. The pre-merge
 *  /po/ routes are noindex redirects and are left out. */
function publicPaths(): string[] {
  return [
    GAME_PATHS.home,
    GAME_PATHS.resume,
    GAME_PATHS.pdf,
    ...cases.map((caseStudy) => casePath(caseStudy.slug)),
  ];
}

function absolute(path: string): string {
  return `${site.urls.canonical}${path}`;
}

function lastModified(): Date | undefined {
  const commitDate = process.env.NEXT_PUBLIC_LAST_COMMIT_DATE;
  if (!commitDate) return undefined;

  const parsed = new Date(commitDate);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const modified = lastModified();

  return publicPaths().flatMap((path) => {
    const en = absolute(path);
    const ko = absolute(localizePath(path, "ko"));
    const languages = { en, ko, "x-default": en };

    return [en, ko].map((url) => ({
      url,
      lastModified: modified,
      alternates: { languages },
    }));
  });
}
