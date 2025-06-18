// src/components/Card.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Card as CardType } from "@/schemas/card-schema";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function CardDisplay({ card }: { card: CardType }) {
  const locale = useLocale();
  const title = locale === "fr" ? card.title_fr : card.title_en;
  const description =
    locale === "fr" ? card.description_fr : card.description_en;
  return (
    <Card className="group relative w-full overflow-hidden border shadow-sm transition-all duration-200 h-80 p-2">
      <Image
        src={`/${card.img}`} // Ensure this path is correct relative to /public
        alt={title}
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-80 z-10" />

      <div className="flex flex-col relative z-20 p-2 flex-1">
        <CardHeader className="p-0">
          <CardTitle className="text-white text-lg font-semibold text-center bg-black/50 p-2 rounded-md">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-0 flex-1 justify-center">
          <p className="text-md text-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-center">
            {description}
          </p>
        </CardContent>
      </div>
    </Card>
  );
}
