import { z } from "zod";

export default z.object({
  image: z.string().url(),
  artist: z.string(),
  description: z.string(),
  title: z.string(),
  price: z.number(),
  priceSale: z.number().optional(),
});
