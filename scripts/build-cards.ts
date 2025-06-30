import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { CardSchema, Card } from "@/schemas/card-schema";
import { savePdf } from "@/utils/build-pdf";

const inputDir = path.resolve("cards");
const outputPath = path.resolve("src/data/cards.json");

const cards: Card[] = fs
  .readdirSync(inputDir)
  .filter((f) => f.endsWith(".yml") || f.endsWith(".yaml"))
  .map((filename) => {
    const filepath = path.join(inputDir, filename);
    const raw = fs.readFileSync(filepath, "utf8");
    const parsed = yaml.load(raw);

    const result = CardSchema.safeParse(parsed);
    if (!result.success) {
      console.error(`❌ Invalid card format in ${filename}`);
      console.error(result.error.format());
      process.exit(1);
    }

    return result.data;
  });

fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2));
console.log(`✅ Successfully built ${cards.length} cards.`);

// 🆕 Pass fresh cards directly
await savePdf("en", "public/pdf/cards_en.pdf", cards);
console.log("✅ Successfully built English PDF.");

await savePdf("fr", "public/pdf/cards_fr.pdf", cards);
console.log("✅ Successfully built French PDF.");
