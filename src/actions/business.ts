import { cache } from "react";
import uuid4 from "uuid4";
import { toastSuccess, toastError } from "@/helpers/toast";
import {
  BusinessAttendanceSchema,
  BusinessInfoFormSchema,
  BusinessPackageSchema,
  BusinessUserSchema,
  SubscriberSchema,
} from "@/schemas/business";
import {
  BUSINESS,
  BUSINESS_USER,
  BUSINESS_PACKAGES,
  MEDIA,
  SUBSCRIBER,
  SUBSCRIPTION,
  SUBSCRIBER_ATTENDANCE,
  ATTENDANCE,
  BUSINESS_PACKAGE,
  MASTER_VALIDITY,
  BUSINESS_SERVICE,
  MASTER_SERVICE_CATEGORY,
} from "@/types/business";

import {
  SubscriberSchemaError,
  UserSchemaError,
  //BusinessAttendanceSchemaError,
  BusinessPackageSchemaError,
  BusinessInfoFormSchemaError,
} from "@/types/zod-errors";
import { apiClient } from "@/helpers/api";
import { ROLE_SUBSCRIBER } from "@/enums";

const defaultGallery = [
  {
    imageId: "131",
    url: "https://images.unsplash.com/photo-1616279967983-ec413476e824?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "zumba",
  },
  {
    imageId: "132",
    url: "https://images.unsplash.com/photo-1508215885820-4585e56135c8?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "yoga",
  },
  {
    imageId: "133",
    url: "https://images.unsplash.com/photo-1603734220970-25a0b335ca01?q=80&w=240&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "cardio",
  },
  {
    imageId: "134",
    url: "https://images.unsplash.com/photo-1561214078-f3247647fc5e?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "aerobics",
  },
  {
    imageId: "135",
    url: "https://images.unsplash.com/photo-1600878585887-c2b9530999a1?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "gym",
  },
];

export const getAllUsers = async (
  businessId: string,
  bodyParams: { [k: string]: unknown },
): Promise<{
  currentPage: number;
  perPage: number;
  total: number;
  success: boolean;
  data?: BUSINESS_USER[];
  message?: string;
}> => {
  try {
    console.log("Sending request with bodyParams:", JSON.stringify(bodyParams));

    const data = await apiClient(
      `/api/admin/business/${businessId}/get-all-users?perPage=100&currentPage=1`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      currentPage: 0,
      perPage: 0,
      total: 0,
      success: false,
      message: "Error",
    };
  }
};

export const getSingleOperator = cache(
  async (
    userId: string,
  ): Promise<{
    success: boolean;
    data?: BUSINESS_USER;
    message?: string;
  }> => {
    try {
      const response = await apiClient(`/api/admin/get-operator/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response;

      if (!response) {
        throw new Error(result.message || "Failed to fetch operator details");
      }
      return { success: true, data: result };
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Error fetching operator",
      };
    }
  },
);

export const addOrUpdateUser = cache(
  async (
    formData: FormData,
  ): Promise<{
    success: boolean;
    data?: BUSINESS_USER;
    errors?: UserSchemaError;
    message?: string;
  }> => {
    const userId = formData.get("userId");

    console.log(userId);

    const validatedFields = BusinessUserSchema.safeParse({
      businessId: formData.get("businessId"),
      fullName: formData.get("fullName"),
      userName: formData.get("userName"),
      status: formData.get("status") || "INACTIVE",
      email: formData.get("email"),
      mobile: Number(formData.get("mobile")),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      phone: formData.get("phone"),
      role: formData.get("role"),
    });

    if (!validatedFields.success) {
      console.error("errors", validatedFields.error.format());
      return {
        success: false,
        errors: validatedFields.error.format(),
        message: "Validation Error",
      };
    }

    const body: {
      businessId: FormDataEntryValue | null;
      fullName: FormDataEntryValue | null;
      userName: FormDataEntryValue | null;
      emailId: FormDataEntryValue | null;
      mobile: number;
      password: FormDataEntryValue | null;
      role: FormDataEntryValue | null;
      isd: string;
      userId?: FormDataEntryValue | null;
    } = {
      businessId: formData.get("businessId"),
      fullName: formData.get("fullName"),
      userName: formData.get("userName"),
      emailId: formData.get("email"),
      mobile: Number(formData.get("mobile")),
      password: formData.get("password"),
      role: formData.get("role"),
      isd: "UH1jADHmrx9lddZkWFAWnQ",
    };

    const apiEndpoint = userId
      ? `/api/admin/update-operator/${userId}`
      : `/api/admin/create-operator`;

    if (userId) {
      body["userId"] = userId;
    }

    console.log("Validated Data:", body);

    try {
      const data = await apiClient(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      return {
        success: true,
        data,
      };
    } catch (e: unknown) {
      let message = "";
      if (typeof e === "string") {
        message = e.toUpperCase();
      } else if (e instanceof Error) {
        message = e.message;
      }
      toastError(message || "Error while updating the detail");
      return {
        success: false,
        message,
      };
    }
  },
);

export const deleteBusinessOperator = cache(
  async (
    userId: string,
  ): Promise<{
    success: boolean;
    message?: string;
  }> => {
    try {
      const response = await apiClient(`/api/admin/delete-operator/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response;

      if (response.error) {
        throw new Error(result.message || "Failed to delete user");
      }

      return { success: !result.error, message: result.message };
    } catch (error) {
      console.error("Delete error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Error deleting user",
      };
    }
  },
);

export const addBusinessServices = cache(
  async (
    businessId: string,
    serviceId: string[],
  ): Promise<{
    success: boolean;
    message?: string;
  }> => {
    try {
      const response = await apiClient(`/api/admin/add-services-to-business`, {
        method: "POST",
        body: JSON.stringify({
          businessId,
          services: serviceId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response;
      if (response.error) {
        throw new Error(result.message || "Failed to add service");
      }

      return { success: !result.error, message: result.message };
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        message: "Error creating service",
      };
    }
  },
);

export const deleteBusinessServices = cache(
  async (
    businessId: string,
    serviceId: string,
  ): Promise<{
    success: boolean;
    data?: BUSINESS_SERVICE[];
    message?: string;
  }> => {
    try {
      const response = await apiClient(`/api/admin/delete-business-services`, {
        method: "POST",
        body: JSON.stringify({
          businessId,
          services: [serviceId],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return { success: true, data: response.services };
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        message: "Error deleting service",
      };
    }
  },
);

export const getBusinessServices = async (
  businessId: string,
  bodyParams: { [k: string]: unknown },
): Promise<{
  currentPage: number;
  perPage: number;
  total: number;
  success: boolean;
  data?: BUSINESS_SERVICE[];
  message?: string;
}> => {
  try {
    const data = await apiClient(`/api/admin/get-business-services`, {
      method: "POST",
      body: JSON.stringify({ businessId, ...bodyParams }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return {
      success: true,
      data: data.services || [],
      perPage: 0,
      currentPage: 0,
      total: 0,
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      currentPage: 0,
      perPage: 0,
      total: 0,
      success: false,
      message: "Error",
    };
  }
};

export const getAllServices = cache(
  async (): Promise<{
    success: boolean;
    data?: MASTER_SERVICE_CATEGORY[] | undefined;
    message?: string;
  }> => {
    try {
      const data = await apiClient(`/api/service/services`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return { success: true, data: data.categories };
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        message: "Error",
      };
    }
  },
);

export const getBusinessDetails = cache(
  async (
    businessId: string,
  ): Promise<{
    success: boolean;
    data?: BUSINESS;
    message?: string;
  }> => {
    try {
      const data = await apiClient(
        `/api/info/business/details-part1/${businessId}`,
        { method: "GET" },
      );
      console.log(data);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        message: "Error",
      };
    }
  },
);

export const getPackages = cache(
  async (
    businessId: string,
  ): Promise<{
    success: boolean;
    data?: BUSINESS_PACKAGES | [];
    message?: string;
  }> => {
    try {
      const data = await apiClient(`/api/admin/${businessId}/packages`, {
        method: "GET",
      });
      return { success: true, data };
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        message: "Error",
      };
    }
  },
);

export const getValidities = cache(
  async (): Promise<{
    success: boolean;
    data?: MASTER_VALIDITY[] | [];
    message?: string;
  }> => {
    try {
      const data = await apiClient(`/api/master/package-validity`, {
        method: "GET",
      });
      return { success: true, data };
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        message: "Error",
      };
    }
  },
);

export const getBusinessAllServices = cache(
  async (
    businessId: string,
  ): Promise<{
    success: boolean;
    data?: BUSINESS_SERVICE[] | [];
    message?: string;
  }> => {
    try {
      const data = await apiClient(`/api/admin/get-business-services`, {
        method: "POST",
        body: JSON.stringify({ businessId }),
      });
      return { success: true, data: data.services || [] };
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        message: "Error",
      };
    }
  },
);

export const addOrUpdatePackage = cache(
  async (
    formData: FormData,
  ): Promise<{
    success: boolean;
    data?: BUSINESS_PACKAGE;
    errors?: BusinessPackageSchemaError;
    message?: string;
  }> => {
    const fieldList = {
      packageId: formData.get("packageId"),
      businessId: formData.get("businessId"),
      packageName: formData.get("packageName"),
      price: Number(formData.get("price")),
      discount: Number(formData.get("discount")),
      validityId: formData.get("validityId"),
      minPrice: Number(formData.get("minPrice")),
      subcriptionLimit: Number(formData.get("subscriptionLimit")),
      popular: formData.get("popular") === "on",
      // availableServices: formData.get("availableServices"),
      availableServices: formData.getAll("availableServices"),
    };

    const validatedFields = BusinessPackageSchema.safeParse(fieldList);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      console.error("errors", validatedFields.error);
      return {
        success: false,
        errors: validatedFields.error.format(),
        message: "Validation Error",
      };
    }
    // console.log("validated", validatedFields.data);

    try {
      const data = await apiClient(`/api/admin/create-package`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedFields.data),
      });

      return {
        success: true,
        data,
      };
    } catch (e: unknown) {
      let message = "";
      if (typeof e === "string") {
        message = e.toUpperCase();
      } else if (e instanceof Error) {
        message = e.message;
      }
      toastError(message || "Error while updating the detail");
      return {
        success: false,
        message,
      };
    }
  },
);

export const getMedias = cache(
  async (
    businessId: string,
  ): Promise<{
    success: boolean;
    data?: MEDIA[];
  }> => {
    try {
      const data = await apiClient(
        `/api/info/business/details-part2/${businessId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      let galleryImages: MEDIA[] = [];
      data.categories.forEach(({ images }: { images: MEDIA[] }) => {
        galleryImages = [...images, ...galleryImages];
      });
      return { success: true, data: galleryImages || defaultGallery };
    } catch (error) {
      console.error("Fetch error:", error);
      return { success: true, data: defaultGallery };
      // return {
      //   success: false,
      // };
    }
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
            userId: "2301",
            fullName: "Sandeep",
            userGender: "F",
            mobile: 12345343,
            subscription: "Package 1, Package 2",
            startDate: "1st Jan 2025",
            endDate: "31st March 2025",
          },
          {
            userId: "2301",
            fullName: "Amit",
            userGender: "F",
            mobile: 911283633,
            subscription: "Package 3, Package 7",
            startDate: "18th March 2025",
            endDate: "31st March 2025",
          },
          {
            userId: "2301",
            fullName: "Krish",
            userGender: "F",
            mobile: 911284843,
            subscription: "Package 4, Package 5",
            startDate: "20th Feb 2025",
            endDate: "25th Feb 2025",
          },
          {
            userId: "2301",
            fullName: "Keshav",
            userGender: "F",
            mobile: 919494843,
            subscription: "Package 2",
            startDate: "10th Feb 2025",
            endDate: "25th May 2025",
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

export const addAttendance = async (formData: FormData) => {
  const rawInput = {
    businessId: formData.get("businessId"),
    // firstName: formData.get("firstName"),
    fullName: formData.get("fullName"),
    // lastName: formData.get("lastName"),
    mobile: Number(formData.get("mobile")),
    inTime: formData.get("inTime"),
    outTime: formData.get("outTime"),
    subscriptionId: formData.get("subscriptionId"),
  };

  const validatedFields = BusinessAttendanceSchema.safeParse(rawInput);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.error("errors", validatedFields.error.format());
    return {
      success: false,
      errors: validatedFields.error.format(), // zod formatted errors
    };
  }

  console.log("validated", validatedFields.data);

  try {
    const response = await apiClient("/submit", {
      method: "POST",
      body: JSON.stringify(validatedFields.data),
    });
    toastSuccess("Details updated successfully");
    console.log("Response:", response);
    return {
      success: true,
      data: response,
    };
  } catch (e: unknown) {
    let message = "";
    if (typeof e === "string") {
      message = e.toUpperCase();
    } else if (e instanceof Error) {
      message = e.message;
    }
    toastError(message || "Error while updating the detail");
    return {
      success: false,
      errorMessage: message || "Unknown error",
    };
  }
};

export const getUserByMobile = cache(
  async (
    isdId: string,
    mobile: number,
  ): Promise<{
    success: boolean;
    message?: string;
    data?: SUBSCRIBER;
  }> => {
    try {
      const data = await apiClient(`/api/service/search-user`, {
        method: "POST",
        body: JSON.stringify({
          mobile,
          isdId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return { success: true, data };
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        message: "Error while searching",
      };
    }
  },
);

export const updateBusinessDetails = async (
  formData: FormData,
): Promise<{
  success: boolean;
  data?: BUSINESS;
  errors?: BusinessInfoFormSchemaError;
  message?: string;
}> => {
  const businessId = formData.get("businessId");

  const validatedFields = BusinessInfoFormSchema.safeParse({
    establishedOn: formData.get("establishedOn"),
    reviews: formData.get("reviews"),
    rating: formData.get("rating"),
    reviewRatingUrl: formData.get("reviewRatingUrl"),
    geolocation: formData.get("geolocation"),
    phone: formData.get("phone"),
    bio: formData.get("bio"),
    socialProfiles: {
      facebook: formData.get("facebook"),
      instagram: formData.get("instagram"),
      youtube: formData.get("youtube"),
      twitter: formData.get("twitter"),
    },
  });

  // Handle validation failure
  if (!validatedFields.success) {
    console.error("errors", validatedFields.error.format());
    return {
      success: false,
      errors: validatedFields.error.format(),
      message: "Validation Error",
    };
  }

  try {
    const response = await apiClient(
      `/api/admin/business/details-part1/${businessId}`,
      {
        method: "PUT",
        body: JSON.stringify(validatedFields.data),
      },
    );
    toastSuccess("Details updated successfully");
    return response;
  } catch (e: unknown) {
    let message = "";
    if (typeof e === "string") {
      message = e.toUpperCase();
    } else if (e instanceof Error) {
      message = e.message;
    }
    toastError(message || "Error while updating the detail");
    return {
      success: false,
      message,
    };
  }
};

export const createSubscriber = cache(
  async (
    formData: FormData,
  ): Promise<{
    success: boolean;
    data?: BUSINESS_USER;
    errors?: SubscriberSchemaError;
    message?: string;
  }> => {
    const uniqueId = uuid4();
    console.log(uniqueId);

    const validatedFields = SubscriberSchema.safeParse({
      fullName: formData.get("fullName"),
      userName: formData.get("userName"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      height: Number(formData.get("height")),
      weight: Number(formData.get("weight")),
      //userGender: formData.get("userGender"),
      //dob: formData.get("dob"),
    });

    if (!validatedFields.success) {
      console.error("errors", validatedFields.error.format());
      return {
        success: false,
        errors: validatedFields.error.format(),
        message: "Invalid data",
      };
    }

    try {
      const data = await apiClient(`/api/admin/create-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validatedFields.data,
          isd: "UH1jADHmrx9lddZkWFAWnQ",
          role: ROLE_SUBSCRIBER,
          password: uniqueId,
        }),
      });

      return {
        success: true,
        data,
      };
    } catch (e: unknown) {
      let message = "";
      if (typeof e === "string") {
        message = e.toUpperCase();
      } else if (e instanceof Error) {
        message = e.message;
      }
      toastError(message || "Error while updating the detail");
      return {
        success: false,
        message,
      };
    }
  },
);

export const createSubscription = async (params: {
  [k: string]: string | number;
}): Promise<{
  success: boolean;
  message?: string;
}> => {
  try {
    const response = await apiClient(`/api/service/subscribe-package`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response;
    if (response.error) {
      throw new Error(result.message || "Failed to create subscription");
    }

    return { success: !result.error, message: result.message };
  } catch (e) {
    let message = "";
    if (typeof e === "string") {
      message = e.toUpperCase();
    } else if (e instanceof Error) {
      message = e.message;
    }
    toastError(message || "Error while creating subscription");
    return {
      success: false,
      message,
    };
  }
};
