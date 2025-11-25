"use client";

import { useState } from "react";
import { useUpload } from "../../features/upload/upload";

export default function UploadPage() {
    const [file, setFile] = useState<File | null>(null);
    const [analysis, setAnalysis] = useState<any>(null);

    const { loading, uploaded, error, upload } = useUpload();

    async function handleUploadAndAnalyze() {
        if (!file) return;

        // 1) 파일 업로드(S3)
        const uploadedData = await upload(file);
        if (!uploadedData) return;

        // 2) FastAPI register 호출
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/documents/register`,
            {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    file_name: uploadedData.file_name,
                    s3_key: uploadedData.s3_key,
                }),
            }
        );

        const data = await res.json();
        setAnalysis(data);
    }

    return (
        <div style={{ padding: "2rem" }}>
            <h1>문서 업로드</h1>

            <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <button
                onClick={handleUploadAndAnalyze}
                disabled={loading || !file}
                style={{ marginLeft: "1rem" }}
            >
                {loading ? "업로드 중..." : "업로드 + 분석"}
            </button>

            {uploaded && (
                <div style={{ marginTop: "1rem" }}>
                    <h3>업로드 완료</h3>
                    <p>파일명: {uploaded.file_name}</p>
                    <p>S3 Key: {uploaded.s3_key}</p>
                </div>
            )}

            {analysis && (
                <div style={{ marginTop: "2rem" }}>
                    <h2>📌 분석 결과</h2>

                    <p>
                        <strong>요약(final):</strong>{" "}
                        {analysis.summaries?.final}
                    </p>

                    <p>
                        <strong>요약(abstract):</strong>{" "}
                        {analysis.summaries?.abstract}
                    </p>

                    <p>
                        <strong>요약(bullet):</strong>{" "}
                        {analysis.summaries?.bullet}
                    </p>

                    <p>
                        <strong>원문 파싱:</strong>
                    </p>
                    <pre
                        style={{
                            whiteSpace: "pre-wrap",
                            background: "#f2f2f2",
                            padding: "1rem",
                        }}
                    >
                        {analysis.parsed_text}
                    </pre>
                </div>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}