// src/pdf/PdfCardBack.tsx
import React from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";

type Props = {
  description: string;
  number: number;
  setLabel: number;
  qrImage: string;
};

export const PdfCardBack: React.FC<Props> = ({
  description,
  number,
  setLabel,
  qrImage,
}) => {
  return (
    <View style={styles.card}>
      {/* Card number (top left) */}
      <View style={styles.topLeftBox}>
        <Text style={styles.boxText}>{number}</Text>
      </View>

      {/* Description (center) */}
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Set label (bottom left) */}
      <Text style={styles.setLabel}>Set {setLabel}</Text>

      {/* QR code (bottom right) */}
      {qrImage && <Image src={qrImage} style={styles.qrCode} />}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    height: 210,
    padding: 10,
    position: "relative",
    border: "1pt solid black",
  },
  topLeftBox: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  boxText: {
    color: "white",
    fontSize: 14,
    fontWeight: 600,
  },
  descriptionBox: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  description: {
    fontSize: 12,
    textAlign: "center",
  },
  setLabel: {
    position: "absolute",
    bottom: 10,
    left: 10,
    fontSize: 8,
    padding: 6,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
  },
  qrCode: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
  },
});
