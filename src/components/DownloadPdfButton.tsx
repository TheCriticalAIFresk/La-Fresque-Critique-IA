"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useLocale } from "next-intl";

export function DownloadPdfButton() {
  const locale = useLocale();

  const fileUrl = `/pdf/cards_${locale || "en"}.pdf`;

  return (
    <a href={fileUrl} download>
      <Button variant="outline" className="gap-2">
        <Download size={16} />
        Download PDF
      </Button>
    </a>
  );
}
