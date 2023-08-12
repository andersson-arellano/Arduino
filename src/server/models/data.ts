import { z } from "zod";

export const dataSchema = z.object({
  distance: z.number().positive(),
  timestamp: z.number().positive()
});

export type Data = z.infer<typeof dataSchema>;