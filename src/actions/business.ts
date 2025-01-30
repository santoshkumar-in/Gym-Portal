import { cache } from "react";
import { BUSINESS, BUSINESS_PACKAGES, MEDIAS } from "@/types/business";

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
            snap: "https://snap.com",
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
    data?: BUSINESS_PACKAGES;
    message?: string;
  }> => {
    return new Promise(function (resolve) {
      resolve({
        success: true,
        data: [
          {
            id: businessId,
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
