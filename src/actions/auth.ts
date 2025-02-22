"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { apiClient } from "@/helpers/api";
import { API_BASE_URL } from "@/enums";
import { SigninFormSchema } from "@/schemas/auth";

export async function doSignIn(formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    redirect("/signin");
  }

  // If email/pass correct, return early
  // if (!(
  //     validatedFields.data.username === "testuser" &&
  //     validatedFields.data.password === "12345"
  //   )
  // ) {
  //   redirect("/");
  // }

  const res = await fetch(`${API_BASE_URL}/api/auth/public/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(validatedFields.data),
  });

  if (!res.ok) {
    console.error("err", { ...validatedFields.data, status: res.status });
    redirect("/signin");
  }

  const json = await res.json();
  //console.debug("res", json);
  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();
  cookieStore.set("jwtToken", json.jwtToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  redirect("/");
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
