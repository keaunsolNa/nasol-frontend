"use client";

import { useState } from "react";
import { fetchFinalAnalysis } from "@/features/analysis/fetchFinalAnalysis";

export function useFinalAnalysis() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    async function load() {
        setLoading(true);
        const data = await fetchFinalAnalysis();
        setResult(data);
        setLoading(false);
    }

    return { result, loading, load };
}
