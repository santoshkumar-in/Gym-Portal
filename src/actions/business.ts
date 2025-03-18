import { cache } from "react";
import { toastSuccess, toastError } from "@/helpers/toast";
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
  BUSINESS_PACKAGE,
  MASTER_VALIDITY,
  BUSINESS_SERVICE,
} from "@/types/business";
import { apiClient } from "@/helpers/api";

export const getAllUsers = cache(
  async (
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
      console.log(
        "Sending request with bodyParams:",
        JSON.stringify(bodyParams),
      );

      const data = await apiClient(
        // `/api/admin/business/${businessId}/get-all-users`,
        `/api/admin/business/${businessId}/get-all-users?perPage=10&currentPage=1`,
        {
          method: "POST",
          // body: JSON.stringify(bodyParams),
          headers: {
            "Content-Type": "application/json",
          },
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
  },
);

export const addBusinessServices = cache(
  async (
    businessId: string,
    serviceId: string,
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
      return await response;
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
      return await response;
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        message: "Error deleting service",
      };
    }
  },
);

export const getBusinessServices = cache(
  async (
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
      const response = await apiClient(`/api/admin/get-business-services`, {
        method: "POST",
        body: JSON.stringify({ businessId, ...bodyParams }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
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
  },
);

export const getAllServices = cache(
  async (): Promise<{
    success: boolean;
    data?: BUSINESS_USER[];
    message?: string;
  }> => {
    try {
      const response = await apiClient(`/api/service/services`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Fetch error:", error);
      return {
        success: false,
        message: "Error",
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
    message?: string;
  }> => {
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

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      console.error("errors", validatedFields.error);
      return {
        success: false,
        message: "Validation Error",
      };
    }

    const body = {
      businessId: formData.get("businessId"),
      fullName: formData.get("fullName"),
      userName: formData.get("userName"),
      //status: formData.get("status") || "INACTIVE",
      emailId: formData.get("email"),
      mobile: Number(formData.get("mobile")),
      password: formData.get("password"),
      role: formData.get("role"),
      isd: "UH1jADHmrx9lddZkWFAWnQ", //Remove later with dynamic value
    };

    console.log("validated", body);

    try {
      const data = await apiClient(`/api/admin/create-operator`, {
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

export const getBusinessServices = cache(
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
      availableServices: formData
        .get("availableServices")
        ?.toString()
        .split(","),
    };

    const validatedFields = BusinessPackageSchema.safeParse(fieldList);

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      console.error("errors", validatedFields.error);
      return {
        success: false,
        message: "Validation Error",
      };
    }
    console.log("validated", validatedFields.data);

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

export const updateBusinessDetails = async (
  formData: FormData,
): Promise<{
  success: boolean;
  data?: BUSINESS;
  message?: string;
}> => {
  const businessId = formData.get("businessId");
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
    return {
      success: false,
      message: "Validation Error",
    };
  }

  //console.log("validated", validatedFields.data);

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
    return;
  }

  console.log("validated", validatedFields.data);

  try {
    const response = await apiClient("/submit", {
      method: "POST",
      body: JSON.stringify(validatedFields.data),
    });
    toastSuccess("Details updated successfully");
    console.log("Response:", response);
  } catch (e: unknown) {
    let message = "";
    if (typeof e === "string") {
      message = e.toUpperCase();
    } else if (e instanceof Error) {
      message = e.message;
    }
    toastError(message || "Error while updating the detail");
  }
};
