"use client"
import { useState } from "react"

interface PurchaseButtonProps {
    priceId: string
}

export function PurchaseButton({ priceId }: PurchaseButtonProps) {
    const [isLoading, setIsLoading] = useState(false)

    async function handleBuy() {
        setIsLoading(true)

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId }),
            })

            if (!response.ok) {
                throw new Error("Error creating checkout session")
            }

            const { checkoutUrl } = await response.json()
            window.location.href = checkoutUrl // Redirect to Stripe
        } catch (error) {
            console.error(error)
            alert("Failed to redirect to payment!")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            onClick={handleBuy}
            className={`w-full max-w-[520px] p-5 rounded-[8px] text-white text-[18px] font-bold bg-green-300  transition hover:duration-200
                ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-70 cursor-pointer"}
            `}
            disabled={isLoading}
        >
            {isLoading ? "Processing..." : "Buy now"}
        </button>
    )
}
