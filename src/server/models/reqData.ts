import { z } from "zod";

export const dataRequestSchema = z.object({
  distance: z.number().positive()
});