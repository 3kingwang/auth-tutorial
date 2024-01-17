"use server"

import { LoginSchema } from "@/schemas"
import * as z from "zod"

export const login = async(values: z.infer<typeof LoginSchema>) => {
  const validatedfields = LoginSchema.safeParse(values)
  if (!validatedfields.success) {
    return { error: "Invalid fields!" }
  }
  return { success: "Email sent" }
}
