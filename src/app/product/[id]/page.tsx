import { PurchaseButton } from "@/components/purchaseButton"
import { getProduct } from "@/lib/stripe/getProduct"
import { Metadata } from "next"
import Image from "next/image"

interface ProductPageProps {
    params: Promise<{
        id: string
    }>
}

interface ProductProps {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string | null
    defaultPriceId: string
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params 
    const product: ProductProps = await getProduct(id)

    return {
        title: `${product.name} | Ignite Shop`,
        description: product.description ?? "No description available",
    }
}


export default async function Product({ params }: ProductPageProps) {
    const { id } = await params 
    const product: ProductProps = await getProduct(id)

    return (
        <main className="w-full flex flex-col items-center justify-between m-auto lg:max-w-[1180px] lg:h-[656px] lg:flex-row lg:justify-between">
            
            <div className="h-full w-full max-w-[280px] flex items-center justify-center bg-[linear-gradient(180deg,_#1EA483_0%,_#7465D4_100%)] rounded-[8px] mb-10 md:max-w-[576px] lg:mb-0">
                <Image width={520} height={480} src={product.imageUrl} alt={product.name} />
            </div>

            
            <div className="w-full h-full max-w-[280px] flex flex-col items-center justify-between md:max-w-[520px]">
                <div className="flex flex-col justify-center items-center mb-12 lg:mb-0 lg:items-start">
                    <h2 className="text-gray-200 text-2xl font-bold mb-4 md:text-[32px]">{product.name}</h2>

                    <strong className="text-green-100 text-2xl font-normal mb-10 md:text-[32px]">
                        {product.price.toLocaleString("pt-BR", { 
                            style: "currency", 
                            currency: "BRL", 
                        })}
                    </strong>

                    <p className="text-gray-200 text-sm font-normal text-center md:text-[18px] lg:text-left">
                        {product.description ?? "No description available"}
                    </p>
                </div>

                
                <PurchaseButton priceId={product.defaultPriceId} />
            </div>
        </main>
    )
}
