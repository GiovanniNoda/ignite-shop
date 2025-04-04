import { getProduct } from "@/lib/stripe/getProduct"
import Image from "next/image"

interface ProductPageProps {
    params: {
      id: string
    }
  }

interface ProductProps {
    id: string
    name: string
    imageUrl: string
    price: number
    description: string | null
}

export default async function Product({ params }: ProductPageProps) {
    const product: ProductProps = await getProduct(params.id)

    return (
        <main className="w-full max-w-[1180px] min-h-[656px] flex items-center justify-between m-auto">
            <div className="h-full w-full max-w-[576px] flex items-center justify-center bg-[linear-gradient(180deg,_#1EA483_0%,_#7465D4_100%)] rounded-[8px]">
                <Image width={520} height={480} src={product.imageUrl} alt={product.name} />
            </div>

            <div className="w-full max-w-[520px] h-full flex flex-col items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-gray-200 font-bold text-[32px] mb-4">{product.name}</h2>

                    <strong className="text-green-100 font-normal text-[32px] mb-10">{product.price.toLocaleString("pt-BR", { 
                        style: "currency", 
                        currency: "BRL", 
                        })}
                    </strong>

                    <p className="text-gray-200 text-[18px] font-normal">{product.description}</p>
                </div>

                <button className="w-full max-w-[520px] bg-green-300 p-5 rounded-[8px] text-white text-[18px] font-bold cursor-pointer hover:opacity-70 transition hover:duration-200">Comprar agora</button>
            </div>
        </main>
    )
}
