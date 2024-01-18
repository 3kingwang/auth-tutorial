"use server"

import { LoginSchema } from "@/schemas"
import * as z from "zod"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedfields = LoginSchema.safeParse(values)
  if (!validatedfields.success) {
    return { error: "Invalid fields!" }
  }
  const { email, password } = validatedfields.data
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password!" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error
  }
}
