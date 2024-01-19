"use server"

import { LoginSchema } from "@/schemas"
import * as z from "zod"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { AuthError } from "next-auth"
import { generateVerificationToken } from "@/lib/tokens"
import { getUserByEmail } from "@/data/user"
import { sendVerificationEmail } from "@/lib/mail"

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedfields = LoginSchema.safeParse(values)
  if (!validatedfields.success) {
    return { error: "Invalid fields!" }
  }
  const { email, password } = validatedfields.data

  const existingUser = await getUserByEmail(email)
  if(!existingUser || !existingUser.email || !existingUser.password){
    return {error:'Email does not exist!'}
  }
  if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(email)
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    )
    return{success:'Confirmation email sent!'}
  }
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
