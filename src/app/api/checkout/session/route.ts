import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil",
})

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get("session_id")

    if (!sessionId) {
        return NextResponse.json({ error: "Session ID is required" }, { status: 400 })
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ["line_items.data.price.product"],
        })

        const product = session.line_items?.data[0].price?.product

        const productName = typeof product === "object" && "name" in product ? product.name : "Produto Desconhecido"
        const productImage = typeof product === "object" && "images" in product ? product.images[0] : ""
        
        return NextResponse.json({
            customer_name: session.customer_details?.name,
            product_name: productName,
            product_image: productImage,
        });
    } catch (error) {
        console.error("Erro ao buscar sessão do Stripe:", error)
        return NextResponse.json({ error: "Failed to fetch session" }, { status: 500 })
    }
}
