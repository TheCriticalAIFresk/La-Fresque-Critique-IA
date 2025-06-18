// src/app/api/generate-pdf/route.ts
import { buildPdf } from "@/utils/build-pdf";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const lang = (req.nextUrl.searchParams.get("lang") || "en") as "en" | "fr";

  const fileBuffer = await buildPdf(lang);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="cards_${lang}.pdf"`,
    },
  });
}
