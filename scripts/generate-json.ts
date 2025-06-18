// scripts/generate-json.ts
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import QRCode from "qrcode";
import { CardWithQR, CardSchema } from "@/schemas/card-schema";

const inputDir = path.resolve("cards");
const outputPath = path.resolve("src/data/cards.json");
const qrOutputDir = path.resolve("public/qrcodes");

if (!fs.existsSync(qrOutputDir)) {
  fs.mkdirSync(qrOutputDir, { recursive: true });
}

const cards: CardWithQR[] = fs
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

    const data: CardWithQR = result.data;

    // Generate QR code buffer and write to file
    if (data.url) {
      const qrPath = path.join(qrOutputDir, `card_${data.card_number}.png`);
      QRCode.toBuffer(data.url, { width: 256 }, (err, buf) => {
        if (err) throw err;
        fs.writeFileSync(qrPath, buf);
      });

      data.qr_img = `/qrcodes/card_${data.card_number}.png`;
    }

    return data;
  });

fs.writeFileSync(outputPath, JSON.stringify(cards, null, 2));
console.log(`✅ Wrote ${cards.length} cards and QR codes to ${outputPath}`);
