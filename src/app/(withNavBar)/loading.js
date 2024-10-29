"use client"
import DepxTechLoading from "@/components/ui/depxtechLoading";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-[var(--background-start-rgb)]">
            <DepxTechLoading />
        </div>
    );
}
