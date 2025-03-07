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

export const BusinessUserSchema = z
  .object({
    businessId: z.string().trim(),
    fullName: z.string().trim(),
    userName: z.string().trim(),
    email: z.string().email().trim(),
    mobile: z.number().min(10, "Mobile must be 10 digit"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().trim(),
    role: z.string().trim(),
    status: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // This ensures the error appears under confirmPassword
  });

export const BusinessAttendanceSchema = z.object({
  id: z.string().trim(),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  mobile: z.string().trim(),
  inTime: z.string().trim(),
  outTime: z.string().trim(),
});
