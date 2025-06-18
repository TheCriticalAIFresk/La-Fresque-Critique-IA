import Link from "next/link";
import CardDisplay from "@/components/Card";
import cards from "@/data/cards.json";
import { getTranslations } from "next-intl/server";
import { DownloadPdfButton } from "./DownloadPdfButton";

export default async function HomePage() {
  const t = await getTranslations();
  return (
    <main className="flex flex-col items-center justify-center gap-6 p-4 md:p-8">
      <h1 className="text-4xl font-black">{t("title")}</h1>
      <DownloadPdfButton />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl">
        {cards.map((card) => (
          <Link href={`/card/${card.card_number}`} key={card.card_number}>
            <CardDisplay card={card} />
          </Link>
        ))}
      </div>
    </main>
  );
}
