"use client"
import { useState } from "react"

interface PurchaseButtonProps {
    priceId: string;
}

export function PurchaseButton({ priceId }: PurchaseButtonProps) {
    const [isLoading, setIsLoading] = useState(false);

    async function handleBuy() {
        setIsLoading(true);

        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId }),
            });

            if (!response.ok) {
                throw new Error("Erro ao iniciar checkout");
            }

            const { checkoutUrl } = await response.json();
            window.location.href = checkoutUrl; // Redireciona para Stripe
        } catch (error) {
            console.error(error);
            alert("Falha ao redirecionar para o pagamento!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <button
            onClick={handleBuy}
            className="w-full max-w-[520px] bg-green-300 p-5 rounded-[8px] text-white text-[18px] font-bold cursor-pointer hover:opacity-70 transition hover:duration-200"
            disabled={isLoading}
        >
            {isLoading ? "Processando..." : "Comprar agora"}
        </button>
    );
}
