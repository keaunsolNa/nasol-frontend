"use client";

import { useState } from "react";

export function useSaveManualInput() {
    const [loading, setLoading] = useState(false);

    async function saveManual(type: "income" | "expense", values: Record<string, string>) {
        setLoading(true);

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/documents-multi-agents/manual`,
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type_of_doc: type,
                    fields: values,
                }),
            }
        );

        setLoading(false);
        return await res.json();
    }

    return { saveManual, loading };
}
