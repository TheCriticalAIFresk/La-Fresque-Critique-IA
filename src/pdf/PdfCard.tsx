// src/pdf/PdfCard.tsx
import React from "react";
import { PdfCardFront } from "./PdfCardFront";
import { PdfCardBack } from "./PdfCardBack";

type CardData = {
  title: string;
  description: string;
  number: number;
  setLabel: number;
  imagePath?: string;
  qrImage: string;
};

export const PdfCard: React.FC<{ card: CardData; side: "front" | "back" }> = ({
  card,
  side,
}) => {
  if (side === "front") {
    return (
      <PdfCardFront
        title={card.title}
        number={card.number}
        imagePath={card.imagePath}
      />
    );
  } else {
    return (
      <PdfCardBack
        description={card.description}
        number={card.number}
        setLabel={card.setLabel}
        qrImage={card.qrImage}
      />
    );
  }
};
