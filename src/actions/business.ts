import { cache } from "react";
import { toastSuccess } from "@/helpers/toast";
import {
  BusinessAttendanceSchema,
  BusinessInfoFormSchema,
  BusinessPackageSchema,
  BusinessUserSchema,
} from "@/schemas/business";
import {
  BUSINESS,
  BUSINESS_USER,
  BUSINESS_PACKAGES,
  MEDIAS,
  SUBSCRIBER,
  SUBSCRIPTION,
  SUBSCRIBER_ATTENDANCE,
  ATTENDANCE,
} from "@/types/business";

export const getBusinessDetails = cache(
  (
    businessId: string,
  ): Promise<{
    success: boolean;
    data: BUSINESS;
    message?: string;
  }> => {
    return new Promise(function (resolve) {
      resolve({
        success: true,
        data: {
          id: businessId,
          coverImage: "/images/cover/cover-01.jpg",
          logo: "/images/business/b1.webp",
          name: "Programatic Soft",
          establishedOn: "2020-12-15",
          reviews: 259,
          rating: "4.2/5",
          followers: "122k",
          reviewRatingUrl: "https://google.com",
          geolocation: "123.78989, 57.90900",
          phone: "+91 234567888",
          bio: "Elevate your fitness journey with our all-in-one gym offering a wide range of services, including strength training, cardio, yoga, personal training, group classes, and more. Whether you&apos;re a beginner or a pro, our expert trainers and state-of-the-art equipment are here to help you achieve your goals in a supportive environment. 💪✨",
          socialProfiles: {
            youtube: "https://youtube.com",
            facebook: "https://fb.com",
            instagram: "https://instagram.com",
            twitter: "https://twitter.com",
          },
        },
      });
    });
  },
);

export const getPackages = cache(
  (
    businessId: string,
  ): Promise<{
    success: boolean;
    data: BUSINESS_PACKAGES | [];
    message?: string;
  }> => {
    return new Promise(function (resolve) {
      console.info(businessId);
      resolve({
        success: true,
        data: [
          {
            id: "120",
            packageName: "Package 1",
            priceMonthly: 1000,
            priceQuarterly: 3000,
            priceHalfYearly: 6000,
            priceYearly: 12000,
            isPopular: false,
            services: [
              "Aerobics",
              "Zumba",
              "Personal Training",
              "Dance",
              "Money back guarantee",
            ],
          },
          {
            id: "121",
            packageName: "Package 2",
            priceMonthly: 1100,
            priceQuarterly: 3200,
            priceHalfYearly: 6300,
            priceYearly: 11000,
            isPopular: false,
            services: [
              "Zumba",
              "Aerobics",
              "Dance",
              "Personal Training",
              "Money back guarantee",
            ],
          },
          {
            id: "122",
            packageName: "Package 3",
            priceMonthly: 1200,
            priceQuarterly: 3200,
            priceHalfYearly: 6500,
            priceYearly: 10000,
            isPopular: false,
            services: [
              "Aerobics",
              "Dance",
              "Personal Training",
              "Money back guarantee",
              "Zumba",
            ],
          },
          {
            id: "123",
            packageName: "Package 4",
            priceMonthly: 800,
            priceQuarterly: 2300,
            priceHalfYearly: 4500,
            priceYearly: 9000,
            isPopular: false,
            services: [
              "Money back guarantee",
              "Aerobics",
              "Dance",
              "Personal Training",
              "Zumba",
            ],
          },
          {
            id: "124",
            packageName: "Package 4",
            priceMonthly: 800,
            priceQuarterly: 2300,
            priceHalfYearly: 4500,
            priceYearly: 9000,
            isPopular: false,
            services: [
              "Money back guarantee",
              "Aerobics",
              "Dance",
              "Personal Training",
              "Zumba",
            ],
          },
          {
            id: "125",
            packageName: "Package 4",
            priceMonthly: 500,
            priceQuarterly: 1500,
            priceHalfYearly: 3000,
            priceYearly: 6000,
            isPopular: false,
            services: [
              "Personal Training",
              "Money back guarantee",
              "Dance",
              "Aerobics",
              "Zumba",
            ],
          },
        ],
      });
    });
  },
);

export const getMedias = cache(
  (
    businessId: string,
  ): Promise<{
    success: boolean;
    data?: MEDIAS;
    message?: string;
    businessId?: string;
  }> => {
    return new Promise(function (resolve) {
      resolve({
        success: true,
        businessId,
        data: [
          {
            id: "131",
            type: "image",
            url: "https://images.unsplash.com/photo-1616279967983-ec413476e824?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "zumba",
          },
          {
            id: "132",
            type: "image",
            url: "https://images.unsplash.com/photo-1508215885820-4585e56135c8?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "yoga",
          },
          {
            id: "133",
            type: "image",
            url: "https://images.unsplash.com/photo-1603734220970-25a0b335ca01?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "cardio",
          },
          {
            id: "134",
            type: "image",
            url: "https://images.unsplash.com/photo-1561214078-f3247647fc5e?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "aerobics",
          },
          {
            id: "135",
            type: "image",
            url: "https://images.unsplash.com/photo-1600878585887-c2b9530999a1?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "gym",
          },
          {
            id: "136",
            type: "image",
            url: "https://images.unsplash.com/photo-1603734220970-25a0b335ca01?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "zumba",
          },
          {
            id: "137",
            type: "image",
            url: "https://images.unsplash.com/photo-1599595815336-affbc70dbf60?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "yoga",
          },
          {
            id: "138",
            type: "image",
            url: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "cardio",
          },
          {
            id: "139",
            type: "image",
            url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "aerobics",
          },
          {
            id: "140",
            type: "image",
            url: "https://images.unsplash.com/photo-1524863479829-916d8e77f114?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "gym",
          },
          {
            id: "141",
            type: "image",
            url: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "zumba",
          },
          {
            id: "142",
            type: "image",
            url: "https://images.unsplash.com/photo-1524594152303-9fd13543fe6e?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category: "aerobics",
          },
        ],
      });
    });
  },
);

export const getSubscribers = cache(
  (
    businessId: string,
  ): Promise<{
    success: boolean;
    data: SUBSCRIBER[] | [];
    message?: string;
  }> => {
    return new Promise(function (resolve) {
      console.info(businessId);
      resolve({
        success: true,
        data: [
          {
            id: "2301",
            name: "Sandeep",
            gender: "F",
            mobile: "+9112345343",
            subscription: "Package 1, Package 2",
            startDate: "1st Jan 2025",
            endDate: "31st March 2025",
          },
          {
            id: "2301",
            name: "Amit",
            gender: "F",
            mobile: "+911283633",
            subscription: "Package 3, Package 7",
            startDate: "18th March 2025",
            endDate: "31st March 2025",
          },
          {
            id: "2301",
            name: "Krish",
            gender: "F",
            mobile: "+911284843",
            subscription: "Package 4, Package 5",
            startDate: "20th Feb 2025",
            endDate: "25th Feb 2025",
          },
          {
            id: "2301",
            name: "Keshav",
            gender: "F",
            mobile: "+919494843",
            subscription: "Package 2",
            startDate: "10th Feb 2025",
            endDate: "25th May 2025",
          },
        ],
      });
    });
  },
);

export const getUsers = cache(
  (
    businessId: string,
  ): Promise<{
    success: boolean;
    data: BUSINESS_USER[] | [];
    message?: string;
  }> => {
    return new Promise(function (resolve) {
      console.info(businessId);
      resolve({
        success: true,
        data: [
          {
            id: "2401",
            firstName: "Sandeep",
            lastName: "Verma",
            gender: "M",
            email: "abs@gm.com",
            mobile: "+9112345343",
            role: "Admin",
            status: "ACTIVE",
          },
          {
            id: "2402",
            firstName: "Sultan",
            lastName: "Mirza",
            gender: "M",
            email: "rt@gm.com",
            mobile: "+9112ff343",
            role: "Operator",
            status: "ACTIVE",
          },
          {
            id: "2403",
            firstName: "Tripti",
            lastName: "K",
            gender: "F",
            email: "fg@gm.com",
            mobile: "+911244443",
            role: "Operator",
            status: "ACTIVE",
          },
        ],
      });
    });
  },
);

export const getUserSubscriptions = cache(
  (
    subscriberId: string,
    businessId: string,
  ): Promise<{
    success: boolean;
    data: SUBSCRIPTION[] | [];
    message?: string;
  }> => {
    return new Promise(function (resolve) {
      console.info(businessId);
      resolve({
        success: true,
        data: [
          {
            id: "4501",
            status: "ACTIVE",
            name: "Package 1, Package 2",
            total: 7,
            consumed: 5,
            price: "INR 2300",
            validity: 90,
            startDate: "1st Jan 2025",
            endDate: "31st March 2025",
            purchasedDate: "31st March 2025",
          },
          {
            id: "4502",
            name: "Package 3, Package 4",
            total: 3,
            consumed: 1,
            price: "INR 1300",
            validity: 90,
            status: "EXPIRED",
            startDate: "21st Nov 2024",
            endDate: "21st March 2025",
            purchasedDate: "31st March 2025",
          },
        ],
      });
    });
  },
);

export const getUserAttendance = cache(
  (
    subscriberId: string,
    businessId: string,
  ): Promise<{
    success: boolean;
    data: SUBSCRIBER_ATTENDANCE[] | [];
    message?: string;
  }> => {
    return new Promise(function (resolve) {
      console.info(businessId);
      resolve({
        success: true,
        data: [
          {
            id: "7501",
            subscription: "Package 1, Package 2",
            date: "1st Jan 2025",
            inTime: "8:30PM",
            outTime: "9:30PM",
          },
          {
            id: "7502",
            subscription: "Package 1, Package 2",
            date: "2nd Jan 2025",
            inTime: "8:30PM",
            outTime: "9:30PM",
          },
          {
            id: "7503",
            subscription: "Package 1, Package 2",
            date: "3rd Jan 2025",
            inTime: "8:30PM",
            outTime: "9:30PM",
          },
          {
            id: "7504",
            subscription: "Package 3, Package 4",
            date: "4th Jan 2025",
            inTime: "8:30PM",
            outTime: "9:30PM",
          },
          {
            id: "7504",
            subscription: "Package 3, Package 4",
            date: "5th Jan 2025",
            inTime: "8:30PM",
            outTime: "9:30PM",
          },
        ],
      });
    });
  },
);

export const getAttendance = cache(
  (
    businessId: string,
  ): Promise<{
    success: boolean;
    data: ATTENDANCE[] | [];
    message?: string;
  }> => {
    return new Promise(function (resolve) {
      console.info(businessId);
      resolve({
        success: true,
        data: [
          {
            id: "7501",
            name: "User 1",
            mobile: "+91457777",
            subscription: "Package 1, Package 2",
            date: "1st Jan 2025",
            inTime: "8:30PM",
            outTime: "9:30PM",
          },
          {
            id: "7502",
            name: "User 2",
            mobile: "+91457777",
            subscription: "Package 1, Package 2",
            date: "2nd Jan 2025",
            inTime: "8:30PM",
            outTime: "9:30PM",
          },
          {
            id: "7503",
            name: "User 3",
            mobile: "+9145457",
            subscription: "Package 1, Package 2",
            date: "3rd Jan 2025",
            inTime: "8:30PM",
            outTime: "9:30PM",
          },
          {
            id: "7504",
            name: "User 4",
            mobile: "+91457777",
            subscription: "Package 3, Package 4",
            date: "4th Jan 2025",
            inTime: "8:30PM",
            outTime: "9:30PM",
          },
          {
            id: "7504",
            name: "User 5",
            mobile: "+91457777",
            subscription: "Package 3, Package 4",
            date: "5th Jan 2025",
            inTime: "8:30PM",
            outTime: "9:30PM",
          },
        ],
      });
    });
  },
);

export const updateBusinessDetails = async (formData: FormData) => {
  const validatedFields = BusinessInfoFormSchema.safeParse({
    establishedOn: formData.get("establishedOn"),
    reviews: formData.get("reviews"),
    rating: formData.get("rating"),
    reviewRatingUrl: formData.get("reviewRatingUrl"),
    geolocation: formData.get("reviewRatingUrl"),
    phone: formData.get("phone"),
    bio: formData.get("bio"),
    socialProfiles: {
      facebook: formData.get("socialProfiles['facebook']"),
      instagram: formData.get("socialProfiles['instagram']"),
      youtube: formData.get("socialProfiles['youtube']"),
      twitter: formData.get("socialProfiles['twitter']"),
    },
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.error("errors", validatedFields.error);
  }
  console.log("validated", validatedFields.data);
  toastSuccess("Details updated successfully");
};

export const updatePackage = async (formData: FormData) => {
  const rawInput = {
    businessId: formData.get("businessId"),
    packageId: formData.get("packageId"),
    packageName: formData.get("packageName"),
    priceMonthly: parseFloat(formData.get("priceMonthly") as string) || 0,
    priceQuarterly: parseFloat(formData.get("priceQuarterly") as string) || 0,
    priceHalfYearly: parseFloat(formData.get("priceHalfYearly") as string) || 0,
    priceYearly: parseFloat(formData.get("priceYearly") as string) || 0,
    isPopular: formData.get("isPopular") === "on",
    services: formData.getAll("services[]"),
  };

  const validatedFields = BusinessPackageSchema.safeParse(rawInput);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.error("errors", validatedFields.error);
  } else {
    console.log("validated", validatedFields.data);
  }

  toastSuccess("Package updated successfully");
};

export const addPackage = async (formData: FormData) => {
  const rawInput = {
    businessId: formData.get("businessId"),
    packageName: formData.get("packageName"),
    priceMonthly: parseFloat(formData.get("priceMonthly") as string) || 0,
    priceQuarterly: parseFloat(formData.get("priceQuarterly") as string) || 0,
    priceHalfYearly: parseFloat(formData.get("priceHalfYearly") as string) || 0,
    priceYearly: parseFloat(formData.get("priceYearly") as string) || 0,
    isPopular: formData.get("isPopular") === "on",
    services: formData.getAll("services[]"),
  };

  const validatedFields = BusinessPackageSchema.safeParse(rawInput);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.error("errors", validatedFields.error);
  } else {
    console.log("validated", validatedFields.data);
  }

  toastSuccess("Package added successfully");
};

export const addOrUpdateUser = async (formData: FormData) => {
  const rawInput = {
    id: formData.get("userId"),
    businessId: formData.get("businessId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    mobile: formData.get("mobile"),
    password: formData.get("password"),
    role: formData.get("role"),
    status: formData.get("status") ? "ACTIVE" : "INACTIVE",
  };

  const validatedFields = BusinessUserSchema.safeParse(rawInput);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.error("errors", validatedFields.error);
  } else {
    console.log("validated", validatedFields.data);
  }

  toastSuccess("User added successfully");
};

export const addAttendance = async (formData: FormData) => {
  const rawInput = {
    businessId: formData.get("businessId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    mobile: formData.get("mobile"),
    inTime: formData.get("inTime"),
    outTime: formData.get("outTime"),
    subscriptionId: formData.get("subscriptionId"),
  };

  const validatedFields = BusinessAttendanceSchema.safeParse(rawInput);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.error("errors", validatedFields.error);
  } else {
    console.log("validated", validatedFields.data);
  }

  toastSuccess("User added successfully");
};
