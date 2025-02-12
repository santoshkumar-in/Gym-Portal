"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { SigninFormSchema } from "@/schemas/auth";

export async function doSignIn(formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    redirect("/signin");
  }

  // If email/pass correct, return early
  if (
    !(
      validatedFields.data.email === "test@gmail.com" &&
      validatedFields.data.password === "12345"
    )
  ) {
    redirect("/");
  }

  console.log("validated", validatedFields.data);

  const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000);
  const cookieStore = await cookies();
  cookieStore.set("jwtToken", "123455", {
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
  const cookie = (await cookies()).get("session")?.value;
  return {
    success: true,
    data: {
      id: 1,
      userId: cookie,
      username: "superadmin",
      email: "business@gmail.com",
      mobile: "9910062638",
      isd: "+91",
      firstName: "Super Admin",
      businessId: "4567",
      businessName: "Progmmatic Soft",
      logoUrl: null,
      role: "ROLE_BUSINESS", //ROLE_SUPER
      menu: [
        {
          menuItem: "Business Details",
          viewOnly: "N",
        },
        {
          menuItem: "Subscribers",
          viewOnly: "N",
        },
        {
          menuItem: "Account users",
          viewOnly: "N",
        },
      ],
    },
  };
});
