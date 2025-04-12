import "keen-slider/keen-slider.min.css"
import { Carousel } from "@/components/carousel"
import { getProductsList } from "@/lib/stripe/getProductsList"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 60 * 60 * 6

export default async function Home() {
  const products = await getProductsList()

  return (
    <main
      className="w-full min-h-[656px] flex-1 ml-auto overflow-x-auto"
      style={{ maxWidth: "calc(100vw - ((100vw - 1180px) / 2))" }}
    >
      {/* Mostra o carrossel apenas em telas >= 1024px */}
      <div className="h-full hidden lg:flex">
        <Carousel products={products} />
      </div>

      {/* Mostra os produtos em coluna para telas menores que 1024px */}
      <div className="flex flex-col gap-8 items-center justify-center px-4 lg:hidden">
        {products.map((product) => (
          <Link
          key={product.id}
          href={`/product/${product.id}`}
          className="group w-full max-w-sm flex flex-col items-center justify-center bg-[linear-gradient(180deg,_#1EA483_0%,_#7465D4_100%)] rounded-[8px] overflow-hidden relative"
        >
          <Image
            width={520}
            height={480}
            src={product.imageUrl}
            alt={product.name}
            className="object-cover"
          />
        
          <footer className="flex justify-between items-center bg-[rgba(32,_32,_36,_0.90)] w-[calc(100%-1rem)] px-8 py-4 font-bold absolute bottom-2 left-2 right-2 rounded-md translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">

            <strong className="text-gray-100 text-sm md:text-[16px]">{product.name}</strong>
        
            <span className="font-bold text-green-100 md:text-xl">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </footer>
        </Link>
        ))}
      </div>
    </main>
  )
}
