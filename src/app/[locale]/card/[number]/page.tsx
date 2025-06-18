// src/app/card/[number]/page.tsx
import {
  Card as ShadCard,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import cards from "@/data/cards.json";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CardPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const { number } = await params;
  const t = await getTranslations();
  const locale = await getLocale();
  const cardNumber = parseInt(number);
  const card = cards.find((c) => c.card_number === cardNumber);

  if (!card) return notFound();

  const prevCard = cards.find((c) => c.card_number === cardNumber - 1);
  const nextCard = cards.find((c) => c.card_number === cardNumber + 1);

  const title = locale === "fr" ? card.title_fr : card.title_en;
  const description =
    locale === "fr" ? card.description_fr : card.description_en;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-primary"
      >
        &larr; {t("back")}
      </Link>

      <ShadCard className="mt-6 shadow-lg border border-border">
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative w-full h-64 rounded-md overflow-hidden">
            <Image
              src={`/${card.img}`}
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          <p className="text-muted-foreground text-base">{description}</p>

          <div>
            <h2 className="font-semibold mb-2 text-lg">{t("bibliography")}</h2>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {card.bibliography.map((entry, idx) => (
                <li key={idx}>
                  {entry.startsWith("http") ? (
                    <a
                      href={entry}
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      {entry}
                    </a>
                  ) : (
                    entry
                  )}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </ShadCard>
      <Pagination className="mt-2">
        <PaginationContent className="justify-between w-full">
          {prevCard ? (
            <PaginationItem>
              <PaginationPrevious href={`/card/${prevCard.card_number}`} />
            </PaginationItem>
          ) : (
            <div></div>
          )}
          {nextCard && (
            <PaginationItem>
              <PaginationNext href={`/card/${nextCard.card_number}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
