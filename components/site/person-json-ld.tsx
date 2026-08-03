import { personSchema } from "@/lib/json-ld";

/** Home pages only — one Person node per site, not per route. */
export function PersonJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
    />
  );
}
