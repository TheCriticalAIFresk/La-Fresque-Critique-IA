import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const inputDir = path.resolve("cards");
const outputPath = path.resolve("src/data/cards.json");

const cards = fs
  .readdirSync(inputDir)
  .filter((f) => f.endsWith(".yml"))
  .map((f) => {
    const raw = fs.readFileSync(path.join(inputDir, f), "utf8");
    const data = yaml.load(raw) as any;
    return {
      title_en: data.title_en,
      title_fr: data.title_fr,
      description_en: data.description_en,
      description_fr: data.description_fr,
      number: data.card_number,
      img: data.img,
      set: data.set,
    };
  });

fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2));
console.log(`✅ Wrote ${cards.length} cards to ${outputPath}`);
