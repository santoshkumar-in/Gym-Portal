import { z } from "zod";
import { SubscriberSchema } from "@/schemas/business";

export type SubscriberSchemaError = z.ZodFormattedError<
  z.infer<typeof SubscriberSchema>,
  string
>;
