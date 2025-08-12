"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useAuth } from "./auth-provider"
import { useToast } from "@/hooks/use-toast"

interface OTPVerificationProps {
  onBack: () => void
}

export function OTPVerification({ onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState("")
  const { verifyOTP, isLoading, pendingUser } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const success = await verifyOTP(otp)
    if (!success) {
      toast({
        title: "Invalid OTP",
        description: "Please check the code and try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-green-200 shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">QC</span>
          </div>
          <CardTitle className="text-2xl text-green-800">Verify Your Email</CardTitle>
          <CardDescription className="text-green-600">
            We've sent a verification code to {pendingUser?.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-green-700">
                Verification Code
              </Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="border-green-200 focus:border-green-500 text-center text-lg tracking-widest"
                placeholder="123456"
                maxLength={6}
              />
            </div>
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <button onClick={onBack} className="text-sm text-green-600 hover:text-green-700 underline">
              Back to signup
            </button>

            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-600 text-center">Demo: Use code "123456" to verify</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
