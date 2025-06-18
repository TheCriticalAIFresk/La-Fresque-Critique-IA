// src/pdf/MyDocument.tsx
import React from "react";
import { Document, Page, StyleSheet, View } from "@react-pdf/renderer";
import { PdfCard } from "./PdfCard";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 30,
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    alignContent: "space-between",
  },
  cardWrapper: {
    width: "48%", // 2 cards per row
    height: "48%", // 2 rows
  },
});

type Props = {
  cards: {
    title: string;
    description: string;
    number: number;
    setLabel: number;
    imagePath: string;
    url?: string;
  }[];
};

export const MyDocument: React.FC<Props> = ({ cards }) => {
  const pages = [];

  for (let i = 0; i < cards.length; i += 4) {
    const batch = cards.slice(i, i + 4);

    // Front page
    pages.push(
      <Page
        size="A4"
        orientation="landscape"
        style={styles.page}
        key={`front-${i}`}
      >
        {batch.map((card, j) => (
          <View style={styles.cardWrapper} key={`card-front-${j}`}>
            <PdfCard card={card} side="front" />
          </View>
        ))}
      </Page>
    );

    // Back page
    pages.push(
      <Page
        size="A4"
        orientation="landscape"
        style={styles.page}
        key={`back-${i}`}
      >
        {batch.map((card, j) => (
          <View style={styles.cardWrapper} key={`card-back-${j}`}>
            <PdfCard card={card} side="back" />
          </View>
        ))}
      </Page>
    );
  }

  return <Document>{pages}</Document>;
};
