import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-03-31.basil"
})

export async function getProduct(id: string) {
    const product = await stripe.products.retrieve(id, {
        expand: ["default_price"],
    })

    const price = product.default_price as Stripe.Price

    return {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount! / 100,
        description: product.description,
        defaultPriceId: price.id,
    }
}