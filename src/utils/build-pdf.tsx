import React from "react";
import ReactPDF from "@react-pdf/renderer";
import fs from "fs";
import path from "path";
import os from "os";
import QRCode from "qrcode";
import { MyDocument } from "@/pdf/MyDocument";
import type { Card } from "@/schemas/card-schema";
import { Locale } from "@/i18n/routing";

// Step 1: Transform and localize cards
const transformCards = async (cards: Card[], lang: Locale, tmpDir: string) => {
  return Promise.all(
    cards.map(async (data) => {
      const url = `https://fresque-critique-ia.vercel.app/${lang}/card/${data.card_number}`;
      const qrPath = path.join(tmpDir, `card_${data.card_number}.png`);
      await QRCode.toFile(qrPath, url, { width: 256 });

      return {
        title: lang === "en" ? data.title_en : data.title_fr,
        description: lang === "en" ? data.description_en : data.description_fr,
        number: data.card_number,
        setLabel: data.card_set,
        imagePath: data.img ? path.resolve(`public/${data.img}`) : undefined,
        qrImage: qrPath,
      };
    })
  );
};

export const savePdf = async (
  lang: Locale,
  outputPath: string,
  allCards: Card[]
) => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "pdf-qr-"));

  try {
    const cards = (await transformCards(allCards, lang, tmpDir)).sort(
      (a, b) => a.number - b.number
    );
    await ReactPDF.render(<MyDocument cards={cards} />, outputPath);
  } finally {
    // Clean up temp QR images
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
};
