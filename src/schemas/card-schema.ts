import z from "zod";

export const CardSchema = z.object({
  card_number: z.number(),
  card_set: z.number(),
  title_en: z.string(),
  title_fr: z.string(),
  description_en: z.string(),
  description_fr: z.string(),
  img: z.string(),
  bibliography: z.array(z.string()),
  url: z.string().optional(),
});

export type Card = z.infer<typeof CardSchema>;

export type CardWithQR = Card & { qr_img?: string };
