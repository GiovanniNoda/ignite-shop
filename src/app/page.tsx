import "keen-slider/keen-slider.min.css"
import { Carousel } from "@/components/carousel"
import { getProductsList } from "@/api/getProductsList"

export const revalidate = 60 * 60 * 6

export default async function Home() {
  const products = await getProductsList();

  return (
   <main className="flex w-full min-h-[656px] ml-auto overflow-x-auto" style={{ maxWidth: "calc(100vw - ((100vw - 1180px) / 2))" }}>
      <Carousel products={products} />
   </main>
  )
}
