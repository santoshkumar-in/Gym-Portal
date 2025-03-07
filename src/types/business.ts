export type BUSINESS = {
  id: string;
  name: string;
  establishedOn: string;
  coverImage: string;
  logo: string;
  reviews: number;
  rating: string;
  followers?: string | null;
  isVerified?: boolean;
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

export type SUBSCRIBER = {
  id: string;
  name: string;
  gender: string;
  mobile: string;
  subscription: string;
  startDate: string;
  endDate: string;
  business?: BUSINESS;
};

export type SUBSCRIBER_ATTENDANCE = {
  id: string;
  date: string;
  subscription: string;
  inTime: string;
  outTime: string;
};

export type SUBSCRIPTION = {
  id: string;
  name: string;
  consumed: number;
  status: "ACTIVE" | "EXPIRED";
  total: number;
  price: string;
  validity: number;
  startDate: string;
  endDate: string;
  purchasedDate: string;
  business?: BUSINESS;
};

export type ATTENDANCE = {
  id: string;
  name: string;
  mobile: string;
  date: string;
  subscription: string;
  inTime: string;
  outTime: string;
  business?: BUSINESS;
};

export type BUSINESS_USER = {
  id: string;
  userName?: string;
  email?: string;
  mobile?: number;
  isd?: string;
  password?: string;
  gender?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  logoUrl?: string | null;
  role?: string;
  status?: string;
};

export type FILTER_DD_TYPE = {
  value: string;
  label: string;
  [key: string]: unknown;
};
