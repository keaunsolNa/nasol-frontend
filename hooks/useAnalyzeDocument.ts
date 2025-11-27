"use client";

import { useState } from "react";

export function useAnalyzeDocument() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function analyzeDocument(file: File, type: "income" | "expense") {
        setLoading(true);
        setError(null);

        try {
            const form = new FormData();
            form.append("file", file);
            form.append("type_of_doc", type);

            // 쿠키에서 CSRF 토큰 읽기
            const csrfToken = document.cookie
            .split("; ")
            .find((row) => row.startsWith("csrf_token="))
            ?.split("=")[1];

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/documents-multi-agents/analyze`,
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                    "X-CSRF-Token": csrfToken || "",
                    },
                    body: form,
                }
            );

            if (!res.ok) {
                const d = await res.json();
                throw new Error(d.detail || "분석 실패");
            }

            return await res.json();
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { analyzeDocument, loading, error };
}
