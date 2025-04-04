import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link";

interface OrderData {
    customer_name: string;
    product_name: string;
    product_image: string;
}

export default async function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
    const sessionId = searchParams.session_id;

    if (!sessionId) {
        return notFound()
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/checkout/session?session_id=${sessionId}`);
    if (!response.ok) {
        return notFound();
    }

    const orderData: OrderData = await response.json();

    return (
        <main className="flex flex-col items-center justify-center h-screen w-full max-w-[590px] m-auto">
           <h3 className="text-gray-100 font-bold text-[32px] mb-16">Compra efetuada!</h3>

           <div className="w-[127px] h-[145px] flex items-center justify-center bg-[linear-gradient(180deg,_#1EA483_0%,_#7465D4_100%)] rounded-[8px] mb-8">
                <Image src={orderData.product_image} alt={orderData.product_name} width={114} height={106} />
           </div>

           <p className="text-gray-200 font-normal text-2xl mb-20">Uhuul <strong className="text-gray-200 font-bold text-2xl">{orderData.customer_name.split(" ")[0]}</strong>, sua <strong className="text-gray-200 font-bold text-2xl">{orderData.product_name}</strong> já está a caminho da sua casa.</p>

           <Link href={'/'} className="text-green-300 text-xl font-bold">Voltar ao catálogo</Link>
        </main>
    );
}
