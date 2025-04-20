import { z } from "zod";

export const BusinessInfoFormSchema = z.object({
  establishedOn: z.string().trim(),
  reviews: z.string().nonempty("reviews is required").trim(),
  rating: z.string().nonempty("rating is required").trim(),
  reviewRatingUrl: z.string().url().trim(),
  geolocation: z.string().nonempty("Geolocation is required").trim(),
  phone: z.string().nonempty("Phone is required").trim(),
  bio: z.string().trim(),
  socialProfiles: z.object({
    facebook: z.string().url().trim().nullable(),
    instagram: z.string().url().trim().nullable(),
    youtube: z.string().url().trim().nullable(),
    twitter: z.string().url().trim().nullable(),
  }),
});



export const BusinessPackageSchema = z.object({
  packageId: z.string().nullish(),
  businessId: z.string().trim(),
  packageName: z.string().nonempty("Package Name is required").trim(),
  price: z.number().min(1, " Price is required "),
  discount: z.number().min(0, "Discount cannot be negative"),
  validityId: z.string().nonempty("Validity is required").trim(),
  minPrice: z.number().min(1, "minPrice is required"),
  subcriptionLimit: z.number(),
  popular: z.boolean(),
  // availableServices: z.string().min(1, "At least one service must be selected")
  // availableServices: z.array(),
  availableServices: z.array(z.string()),


})

export const BusinessUserSchema = z
  .object({
    businessId: z.string().trim(),
    fullName: z.string().nonempty("Full Name is required").trim(),
    userName: z.string().nonempty("User Name is required").trim(),
    email: z.string().nonempty("Email is required").email().trim(),
    mobile: z.number().min(10, "Mobile must be 10 digit"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().trim(),
    role: z.string().trim(),
    status: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const BusinessAttendanceSchema = z.object({
  businessId: z.string().trim(),
  // firatName: z.string().nonempty("First Name is required").trim(),
  // lastName: z.string().nonempty("Last Name is required").trim(),
  fullName: z.string().nonempty("Full Name is required").trim(),
  mobile: z.number().min(10, "Mobile must be 10 digit"),
  inTime: z.string().nonempty("inTime is required").trim(),
  outTime: z.string().nonempty("outTime is required").trim(),
  subscriptionId: z.string().nonempty("subscriptionId is required").trim(),
});

export const SubscriberSchema = z.object({
  fullName: z.string().nonempty("Full Name is required").trim(),
  userName: z.string().nonempty("User Name is required").trim(),
  email: z.string().nonempty("Email is required").email().trim(),
  mobile: z
    .string()
    .nonempty("Mobile is required")
    .length(10, "Mobile must be 10 digit")
    .trim(),
  height: z.number().min(1, "Height is Invalid"),
  weight: z.number().min(1, "Weight is Invalid"),
});

