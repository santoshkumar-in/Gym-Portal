"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { SigninFormSchema, SignInFormState } from "@/lib/definitions";
export async function signup(formData: FormData) {}

export async function doSignIn(formData: FormData) {
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // If email/pass correct, return early
  if (
    !(
      validatedFields.data.email === "test@gmail.com" &&
      validatedFields.data.password === "12345"
    )
  ) {
    return {
      errors: ["incorrect email/password"],
    };
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
    redirect("/auth/signin");
  }
  return { isAuth: true, userId: cookie };
});
