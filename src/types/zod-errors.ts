import { z } from "zod";
import {
  SubscriberSchema,
  BusinessUserSchema,
  BusinessAttendanceSchema,
  BusinessPackageSchema,
  BusinessInfoFormSchema,
} from "@/schemas/business";
import { SigninFormSchema } from "@/schemas/auth";

export type SubscriberSchemaError = z.ZodFormattedError<
  z.infer<typeof SubscriberSchema>,
  string
>;

export type UserSchemaError = z.ZodFormattedError<
  z.infer<typeof BusinessUserSchema>,
  string
>;

export type BusinessAttendanceSchemaError = z.ZodFormattedError<
  z.infer<typeof BusinessAttendanceSchema>,
  string
>;

export type BusinessPackageSchemaError = z.ZodFormattedError<
  z.infer<typeof BusinessPackageSchema>,
  string
>;
export type BusinessInfoFormSchemaError = z.ZodFormattedError<
  z.infer<typeof BusinessInfoFormSchema>,
  string
>;

export type LoginSchemaError = z.ZodFormattedError<
  z.infer<typeof SigninFormSchema>,
  string
>;
