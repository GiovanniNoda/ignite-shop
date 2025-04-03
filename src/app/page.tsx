import Image from "next/image"
import tShirt01 from "../assets/t-shirt01.png"

export default function Home() {
  return (
   <div className="flex g-3 bg-red-500 w-full min-h-[656px] ml-auto"  style={{ maxWidth: "calc(100vw - ((100vw - 1180px) / 2))" }}>
      <a href="#">
        <Image width={520} height={480} src={tShirt01} alt="Camiseta 01" />

        <footer>
          <strong>Camiseta 1</strong>
          <span>R$ 79,90</span>
        </footer>
      </a>
   </div>
  )
}
