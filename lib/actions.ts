"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error("[v0] TURNSTILE_SECRET_KEY not configured")
    return false
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error("[v0] Error verifying Turnstile token:", error)
    return false
  }
}

export async function createPledge(formData: FormData) {
  const supabase = await createClient()

  const turnstileToken = formData.get("turnstileToken") as string

  if (!turnstileToken) {
    return { error: "Security verification required" }
  }

  const isValidToken = await verifyTurnstileToken(turnstileToken)

  if (!isValidToken) {
    return { error: "Security verification failed. Please try again." }
  }

  const donorName = formData.get("donorName") as string
  const amount = Number.parseInt(formData.get("pledgeAmount") as string, 10)
  const charityName = formData.get("charityName") as string
  const betChoice = formData.get("betChoice") as string

  if (!donorName || !amount || !charityName || !betChoice) {
    return { error: "All fields are required" }
  }

  if (betChoice !== "FOR" && betChoice !== "AGAINST") {
    return { error: "Invalid bet choice" }
  }

  const { error } = await supabase.from("pledges").insert({
    donor_name: donorName,
    amount,
    charity_name: charityName,
    bet_choice: betChoice,
  })

  if (error) {
    console.error("[v0] Error creating pledge:", error)
    return { error: "Failed to create pledge" }
  }

  revalidatePath("/")
  return { success: true }
}
