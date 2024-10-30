import Trade from "./client";
import ClientOnly from "@/components/client/ClientOnly";

export const metadata = {
    title: 'Trade Your PC Components | DepxTech',
    description: 'Trade in your PC components for cash. Fast, secure, and environmentally friendly.',
};

export default function TradePage() {
    return (
        <ClientOnly>
            <Trade />
        </ClientOnly>
    );
}