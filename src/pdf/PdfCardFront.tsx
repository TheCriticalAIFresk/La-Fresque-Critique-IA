// src/pdf/PdfCardFront.tsx
import React from "react";
import { View, Text, StyleSheet, Image} from "@react-pdf/renderer";

type Props = {
  title: string;
  number: string;
  imagePath: string;
};

export const PdfCardFront: React.FC<Props> = ({ title, number, imagePath }) => {
  return (
    <View style={styles.card}>
      <Image src={imagePath} style={styles.bgImage} />

      {/* Title Overlay */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Number Box */}
      <View style={styles.numberBox}>
        <Text style={styles.numberText}>{number}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  card: {
    width: 280,
    height: 210,
    position: "relative",
  },
  bgImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  titleBox: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: 900,
    textAlign: "center",
  },
  numberBox: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    fontSize: 14,
    fontWeight: 600,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  numberText: {
    fontSize: 10,
    fontWeight: 600,
  },
});
