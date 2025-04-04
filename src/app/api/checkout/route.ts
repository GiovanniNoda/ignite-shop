import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil"
})

export async function POST(request: NextRequest) {
    console.log("STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY)
    const { priceId } = await request.json()


    if (!priceId) {
        return NextResponse.json({ error: "Price not found" }, { status: 400 })
    }

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
            {
                price: priceId,
                quantity: 1
            },
        ],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/`,
    })

    return NextResponse.json({ checkoutUrl: checkoutSession.url })
}