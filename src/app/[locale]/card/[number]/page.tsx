// src/app/card/[number]/page.tsx
import {
  Card as ShadCard,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
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
  console.log(prevCard, nextCard);

  const title = locale === "fr" ? card.title_fr : card.title_en;
  const description =
    locale === "fr" ? card.description_fr : card.description_en;

  const getTitle = (card: (typeof cards)[0]) =>
    locale === "fr" ? card.title_fr : card.title_en;

  return (
    <div className="p-4">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-primary block mb-4 max-w-6xl mx-auto"
      >
        &larr; {t("back")}
      </Link>

      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto items-stretch">
        {/* Previous Card Preview */}
        {prevCard ? (
          <Link
            className="relative flex-1 flex justify-center items-center overflow-hidden rounded"
            href={`/card/${prevCard.card_number}`}
          >
            {/* Background image */}
            {/* <Image
              src={`/${prevCard.img}`}
              alt={getTitle(prevCard)}
              fill
              className="object-cover"
            /> */}

            {/* <div className="absolute inset-0 bg-black z-5" /> */}
            {/* Gradient overlay that matches image */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent z-10" /> */}

            {/* Optional text over gradient */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <p className="text-black text-lg font-semibold">
                ← {getTitle(prevCard)}
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex-1"></div>
        )}

        {/* Current Card */}
        <div className="flex-[2]">
          <ShadCard className="shadow-lg border border-border">
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
                <details className="block space-y-4">
                  <summary className="cursor-pointer font-semibold mb-2">
                    {t("bibliography")}
                  </summary>
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
                </details>
              </div>
            </CardContent>
          </ShadCard>
        </div>

        {/* Next Card Preview */}
        {nextCard ? (
          <Link
            className="relative flex-1 flex justify-center items-center overflow-hidden rounded"
            href={`/card/${nextCard.card_number}`}
          >
            {/* Background image */}
            {/* <Image
            src={`/${prevCard.img}`}
            alt={getTitle(prevCard)}
            fill
            className="object-cover"
          /> */}

            {/* <div className="absolute inset-0 bg-black z-5" /> */}
            {/* Gradient overlay that matches image */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent z-10" /> */}

            {/* Optional text over gradient */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <p className="text-black text-lg font-semibold">
                {getTitle(nextCard)} →
              </p>
            </div>
          </Link>
        ) : (
          <div className="flex-1"></div>
        )}
      </div>
    </div>
  );
}
