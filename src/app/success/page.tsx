import { notFound } from "next/navigation"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

interface OrderData {
    customer_name: string
    product_name: string
    product_image: string
}

export async function generateMetadata({ searchParams }: { searchParams: { session_id?: string } }): Promise<Metadata> {
    const sessionId = searchParams.session_id
  
    if (!sessionId) {
      return {
        title: "Purchase Not Found",
      }
    }
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/checkout/session?session_id=${sessionId}`)
    if (!response.ok) {
      return {
        title: "Purchase Not Found",
      }
    }
  
    const orderData: OrderData = await response.json()
  
    return {
      title: `Success: ${orderData.product_name} | Ignite Shop`,
      description: `Thank you for your purchase, ${orderData.customer_name.split(" ")[0]}!`,
    }
  }

export default async function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
    const sessionId = searchParams.session_id

    if (!sessionId) {
        return notFound()
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/checkout/session?session_id=${sessionId}`)
    if (!response.ok) {
        return notFound()
    }

    const orderData: OrderData = await response.json()

    return (
        <main className="flex flex-col items-center justify-center h-screen w-full max-w-[590px] m-auto">
           <h3 className="text-gray-100 font-bold text-[32px] mb-16">Purchase successful!</h3>

           <div className="w-[127px] h-[145px] flex items-center justify-center bg-[linear-gradient(180deg,_#1EA483_0%,_#7465D4_100%)] rounded-[8px] mb-8">
                <Image src={orderData.product_image} alt={orderData.product_name} width={114} height={106} />
           </div>

           <p className="text-gray-200 font-normal text-2xl mb-20">Congratulations <strong className="text-gray-200 font-bold text-2xl">{orderData.customer_name.split(" ")[0]}</strong>, your <strong className="text-gray-200 font-bold text-2xl">{orderData.product_name}</strong> is already on the way to your house.</p>

           <Link href={'/'} className="text-green-300 text-xl font-bold">Return to catalog</Link>
        </main>
    );
}
