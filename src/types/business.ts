export type BUSINESS = {
  id: string;
  name: string;
  establishedOn: string;
  coverImage: string;
  logo: string;
  reviews: number;
  rating: string;
  followers?: string | null;
  reviewRatingUrl: string;
  geolocation: string;
  phone: string;
  bio: string;
  socialProfiles: {
    youtube?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
    snap?: string;
  };
};

export type BUSINESS_PACKAGES = BUSINESS_PACKAGE[];

export type BUSINESS_PACKAGE = {
  id: string;
  packageName: string;
  priceMonthly: number;
  priceQuarterly?: number;
  priceHalfYearly?: number;
  priceYearly?: number;
  isPopular: boolean;
  services: string[];
};

export type MEDIAS = MEDIA[];

export type MEDIA = {
  id: string;
  type: string;
  url: string;
  category?: string;
  caption?: string;
  width?: string;
  height?: string;
};
