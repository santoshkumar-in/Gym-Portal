import { z } from "zod";

export const BusinessInfoFormSchema = z.object({
  establishedOn: z.string().trim(),
  reviews: z.string().trim(),
  rating: z.string().trim(),
  reviewRatingUrl: z.string().url().trim(),
  geolocation: z.string().trim(),
  phone: z.string().trim(),
  bio: z.string().trim(),
  socialProfiles: z.object({
    facebook: z.string().url().trim().nullable(),
    instagram: z.string().url().trim().nullable(),
    youtube: z.string().url().trim().nullable(),
    twitter: z.string().url().trim().nullable(),
  }),
});

export const BusinessPackageSchema = z.object({
  businessId: z.string().trim(),
  packageId: z.string().trim(),
  packageName: z.string().trim(),
  priceMonthly: z.number().min(1),
  priceQuarterly: z.number().min(1),
  priceHalfYearly: z.number().min(1),
  priceYearly: z.number().min(1),
  isPopular: z.boolean(),
  services: z.array(z.string()),
});

export const BusinessUserSchema = z.object({
  // id: z.string().trim(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  email: z.string().email().trim(),
  // gender: z.string().trim(),
  mobile: z.string().trim(),
  password: z.string().trim(),
  role: z.string().trim(),
  status: z.string().trim(),
});

export const BusinessAttendanceSchema = z.object({
  id: z.string().trim(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  mobile: z.string().trim(),
  inTime: z.string().trim(),
  outTime: z.string().trim(),
});
