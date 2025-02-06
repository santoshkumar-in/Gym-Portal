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
