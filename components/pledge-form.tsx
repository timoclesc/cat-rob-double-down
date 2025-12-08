"use client"

import type React from "react"

import { createPledge } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useTransition } from "react"
import Turnstile from "react-turnstile"

export function PledgeForm() {
  const [isPending, startTransition] = useTransition()
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setShowSuccess(false)

    if (!turnstileToken) {
      setError("Please complete the security verification")
      return
    }

    const formData = new FormData(e.currentTarget)
    formData.append("turnstileToken", turnstileToken)

    startTransition(async () => {
      const result = await createPledge(formData)

      if (result.error) {
        setError(result.error)
        setTurnstileToken(null)
      } else {
        setShowSuccess(true)
        ;(e.target as HTMLFormElement).reset()
        setTurnstileToken(null)
        setTimeout(() => setShowSuccess(false), 5000)
      }
    })
  }

  return (
    <section id="pledge" className="lg:col-span-3">
      <div className="text-center lg:text-left mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-stone-800">Make Your Pledge</h2>
        <p className="mt-3 text-lg text-stone-600">Every donation makes a difference. Pick a side.</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-stone-50 p-8 rounded-lg shadow-xl border border-stone-200 space-y-6">
        <div>
          <Label htmlFor="donorName" className="text-stone-700">
            Your Name
          </Label>
          <Input type="text" id="donorName" name="donorName" required className="mt-1" disabled={isPending} />
        </div>
        <div>
          <Label htmlFor="donorEmail" className="text-stone-700">
            Email
          </Label>
          <p className="mt-3 text-sm text-stone-500">We'll keep you up to date with our progress, and most importantly, the final result.</p>
          <Input type="email" id="donorEmail" name="donorEmail" className="mt-1" disabled={isPending} />
        </div>
        <div>
          <Label htmlFor="pledgeAmount" className="text-stone-700">
            Pledge Amount ($)
          </Label>
          <Input
            type="number"
            id="pledgeAmount"
            name="pledgeAmount"
            min="1"
            required
            className="mt-1"
            disabled={isPending}
          />
        </div>
        <div>
          <Label htmlFor="charityName" className="text-stone-700">
            Your Chosen Charity
          </Label>
          <Input type="text" id="charityName" name="charityName" required className="mt-1" disabled={isPending} />
        </div>
        <div>
          <Label className="text-stone-700 block mb-2">Your Bet: Do you think we'll finish?</Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="radio"
                name="betChoice"
                id="betFor"
                value="FOR"
                className="sr-only peer"
                required
                disabled={isPending}
              />
              <label
                htmlFor="betFor"
                className="cursor-pointer bg-white border-2 border-stone-300 rounded-lg p-4 text-center block w-full transition-all peer-checked:border-blue-600 peer-checked:bg-blue-50 peer-checked:text-blue-900 hover:border-stone-400"
              >
                <span className="text-2xl block">💪</span>
                <span className="font-bold text-emerald-700">FOR Success</span>
              </label>
            </div>
            <div>
              <input
                type="radio"
                name="betChoice"
                id="betAgainst"
                value="AGAINST"
                className="sr-only peer"
                disabled={isPending}
              />
              <label
                htmlFor="betAgainst"
                className="cursor-pointer bg-white border-2 border-stone-300 rounded-lg p-4 text-center block w-full transition-all peer-checked:border-rose-600 peer-checked:bg-rose-50 peer-checked:text-rose-900 hover:border-stone-400"
              >
                <span className="text-2xl block">🤪</span>
                <span className="font-bold text-rose-700">AGAINST Failure</span>
              </label>
            </div>
          </div>
        </div>
        <p className="text-s text-stone-500 text-center pt-2">
          If you're betting against us, be ready to double your donation!
        </p>
        <div className="flex justify-center">
          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ""}
            onVerify={(token) => setTurnstileToken(token)}
            onError={() => setTurnstileToken(null)}
            onExpire={() => setTurnstileToken(null)}
            theme="light"
          />
        </div>
        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg text-lg"
            disabled={isPending || !turnstileToken}
          >
            {isPending ? "Registering..." : "Register My Pledge"}
          </Button>
        </div>
        <p className="text-xs text-stone-500 text-center pt-2">
          Note: This form registers your pledge. You will be reminded to make the actual donation to your chosen charity
          after the event concludes.
        </p>
      </form>
      {showSuccess && (
        <div className="mt-6 bg-emerald-100 border-l-4 border-emerald-500 text-emerald-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Thank you!</p>
          <p>Your pledge has been successfully registered.</p>
        </div>
      )}
      {error && (
        <div className="mt-6 bg-rose-100 border-l-4 border-rose-500 text-rose-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
    </section>
  )
}
