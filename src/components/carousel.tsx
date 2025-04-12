"use client"

import Image from "next/image"
import Link from "next/link"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

interface Product {
    id: string
    name: string
    imageUrl: string
    price: number
}

interface CarouselProps {
    products: Product[]

}

export function Carousel({ products }: CarouselProps) {
    const [sliderRef] = useKeenSlider({
        slides: {
          perView: 2,
          spacing: 48,
        },
      })

    return (
        <div className="keen-slider" ref={sliderRef}>
            {products.map(product => (
                <Link key={product.id} href={`/product/${product.id}`} className="flex flex-col items-center justify-center bg-[linear-gradient(180deg,_#1EA483_0%,_#7465D4_100%)] relative cursor-pointer rounded-[8px] overflow-hidden h-full w-[696px] group keen-slider__slide">

                    <Image width={520} height={480} src={product.imageUrl} alt={product.name} />
     
                    <footer className="flex justify-between items-center absolute bg-[rgba(32,_32,_36,_0.90)] bottom-2 left-2 right-2 p-8 rounded-md font-bold translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
                        <strong className="text-xl text-gray-100">{product.name}</strong>

                        <span className="text-2xl font-bold text-green-100">
                            {product.price.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </span>
                    </footer>
                </Link>
            ))}
        </div>
    )
}