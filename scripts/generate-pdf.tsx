import ReactPDF from "@react-pdf/renderer";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { MyDocument } from "@/pdf/MyDocument";

const loadCards = (lang: "en" | "fr") => {
  const cardDir = path.resolve(__dirname, "../cards");
  return fs
    .readdirSync(cardDir)
    .filter((f) => f.endsWith(".yml"))
    .map((f) => {
      const content = fs.readFileSync(path.join(cardDir, f), "utf-8");
      const data = yaml.load(content) as any;
      return {
        title: lang === "en" ? data.title_en : data.title_fr,
        description: lang === "en" ? data.description_en : data.description_fr,
        number: data.card_number,
        setLabel: data.card_set,
        imagePath: path.resolve(data.img),
        url: data.url,
      };
    });
};

const buildPdf = async (lang: "en" | "fr") => {
  const cards = loadCards(lang);

  ReactPDF.render(<MyDocument cards={cards} />, `print/cards_${lang}.pdf`);
};

buildPdf("en");
buildPdf("fr");
