import Image from "next/image"
import tShirt01 from "../assets/t-shirt01.png"

export default function Home() {
  return (
   <div className="flex g-3 bg-red-500 w-full min-h-[656px] ml-auto"  style={{ maxWidth: "calc(100vw - ((100vw - 1180px) / 2))" }}>
      <a href="#" className="flex flex-col items-center justify-center bg-[linear-gradient(180deg,_#1EA483_0%,_#7465D4_100%)] relative cursor-pointer rounded-[8px] overflow-hidden h-full w-[696px] group">
        <Image width={520} height={480} src={tShirt01} alt="Camiseta 01" />

        <footer className="flex justify-between items-center absolute bg-[rgba(32,_32,_36,_0.90)] bottom-2 left-2 right-2 p-8 rounded-md font-bold translate-y-full opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100">
          <strong className="text-xl text-gray-100">Camiseta 1</strong>
          <span className="text-2xl font-bold text-green-100">R$ 79,90</span>
        </footer>
      </a>
   </div>
  )
}
