"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { apiClient } from "@/helpers/api";
import { API_BASE_URL } from "@/enums";
import { SigninFormSchema } from "@/schemas/auth";
import { LoginSchemaError } from "@/types/zod-errors";

export async function doSignIn(formData: FormData): Promise<{
  success: boolean;
  redirectTo?: string;
  errors?: LoginSchemaError;
  message?: string;
}> {
  const validatedFields = SigninFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.error("Validation errors:", validatedFields.error.format());
    return {
      success: false,
      errors: validatedFields.error.format(),
      message: "Invalid login credentials",
    };
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/public/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validatedFields.data),
    });

    const json = await res.json();

    if (!res.ok) {
      console.error("API error:", json);
      return {
        success: false,
        message: json?.message || "Failed to sign in",
      };
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1 day
    const cookieStore = await cookies();

    // Save JWT token in secure cookie
    cookieStore.set("jwtToken", json.jwtToken, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });

    // // Optionally store session ID if provided
    // if (json?.session) {
    //   cookieStore.set("session", json.session, {
    //     httpOnly: true,
    //     secure: true,
    //     expires: expiresAt,
    //     sameSite: "lax",
    //     path: "/",
    //   });

    // }

    return {
      success: true,
      redirectTo: "/",
    };
  } catch (e: unknown) {
    const message =
      typeof e === "string" ? e.toUpperCase() : (e as Error)?.message;
    console.error("Unexpected error during sign-in:", message);
    return {
      success: false,
      message: message || "Unexpected error during sign-in",
    };
  }
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  if (!cookie) {
    //redirect("/signin");
    return { isAuth: false };
  }
  return { isAuth: true, userId: cookie };
});

export const getUserDetails = cache(async () => {
  try {
    const data = await apiClient("/api/auth/user", { method: "GET" });
    return {
      success: true,
      data: {
        id: 1,
        username: data?.username,
        email: data?.email,
        mobile: data?.mobile,
        isd: data?.isd,
        firstName: data?.firstName,
        lastName: data?.lastName,
        businessId: data?.businessid,
        businessName: "Progmmatic Soft",
        logoUrl: null,
        role: data?.role, //ROLE_SUPER
        menu: [
          {
            menuItem: "Business Details",
            viewOnly: "N",
          },
          {
            menuItem: "Calender",
            viewOnly: "N",
          },
          {
            menuItem: "Subscribers",
            viewOnly: "N",
          },
          {
            menuItem: "Attendance",
            viewOnly: "N",
          },
          {
            menuItem: "Account users",
            viewOnly: "N",
          },
          {
            menuItem: "Services",
            viewOnly: "N",
          },
        ],
      },
    };
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      success: false,
      message: "Error while signing in",
    };
  }
});
