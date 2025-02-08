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
