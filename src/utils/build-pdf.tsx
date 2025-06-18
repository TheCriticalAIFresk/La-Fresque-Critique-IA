import React from "react";
import ReactPDF from "@react-pdf/renderer";
import path from "path";
import { MyDocument } from "@/pdf/MyDocument";
import type { CardWithQR } from "@/schemas/card-schema";
import allCards from "@/data/cards.json";
import { Locale } from "@/i18n/routing";
import { Readable } from "stream";

// Helper to map and localize card fields
const transformCards = (cards: CardWithQR[], lang: Locale) =>
  cards.map((data) => ({
    title: lang === "en" ? data.title_en : data.title_fr,
    description: lang === "en" ? data.description_en : data.description_fr,
    number: data.card_number,
    setLabel: data.card_set,
    imagePath: path.resolve(`public/${data.img}`),
    url: data.url,
    qrImage: data.qr_img,
  }));

export const savePdf = async (lang: Locale, outputPath: string) => {
  const cards = transformCards(allCards, lang);
  await ReactPDF.render(<MyDocument cards={cards} />, outputPath);
};

export const buildPdf = async (lang: Locale): Promise<Buffer> => {
  const cards = transformCards(allCards, lang);

  const stream = await ReactPDF.renderToStream(<MyDocument cards={cards} />);

  // Helper: convert stream to buffer
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream as Readable) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks);
};
