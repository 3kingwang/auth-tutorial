"use server"

import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { RegisterSchema } from "@/schemas"
import * as z from "zod"
import { getUserByEmail } from "@/data/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedfields = RegisterSchema.safeParse(values)
  if (!validatedfields.success) {
    return { error: "Invalid fields!" }
  }
  const { name, email, password } = validatedfields.data
  const hashedPassword = await bcrypt.hash(password, 10)
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    return { error: "Email already registered!" }
  }
  await db.user.create({ data: { name, email, password: hashedPassword } })

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)
  return { success: "Confirmation email sent!" }
}
