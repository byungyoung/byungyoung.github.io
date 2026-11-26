import { renderResumePdf } from "@/lib/resume-pdf";

export const dynamic = "force-static";

export async function GET(): Promise<Response> {
  const pdf = await renderResumePdf("en");
  return new Response(new Uint8Array(pdf), {
    headers: { "Content-Type": "application/pdf" },
  });
}
