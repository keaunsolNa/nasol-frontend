"use client";

import { useState } from "react";

export function useUpload() {
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    async function upload(file: File) {
        setLoading(true);
        setError(null);

        try {
            const form = new FormData();
            form.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: form,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "업로드 실패");

            setUploaded(data);
            return data;
        } catch (err: any) {
            setError(err.message);
            return null;
        } finally {
            setLoading(false);
        }
    }

    return { upload, loading, uploaded, error };
}
