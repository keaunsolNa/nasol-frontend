"use client";

import { useEffect } from "react";
import { useFinalAnalysis } from "@/hooks/useFinalAnalysis";
import { useRouter } from "next/navigation";

export default function ResultPage() {
    const { load, result, loading } = useFinalAnalysis();
    const router = useRouter();

    useEffect(() => {
        load();
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg text-gray-700 font-medium">
                    AI가 재무 분석을 진행중입니다...
                </p>
                <p className="text-sm text-gray-500">
                    잠시만 기다려주세요
                </p>
            </div>
        );
    }

    if (!result) {
        return (
            <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                    분석 결과가 없습니다
                </h3>
                <p className="text-gray-600">
                    다시 시도하거나 처음부터 입력해주세요
                </p>
                <button
                    onClick={() => router.push("/flow/income")}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    처음으로 돌아가기
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        최종 분석 결과
                    </h2>
                    <p className="text-gray-600">
                        AI가 분석한 맞춤형 재무 전략입니다
                    </p>
                </div>
                <button
                    onClick={() => router.push("/flow/income")}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    새로 시작하기
                </button>
            </div>

            {/* 분석 결과 카드 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            AI 분석 완료
                        </h3>
                        <p className="text-sm text-gray-600">
                            입력하신 소득, 지출 정보를 바탕으로 분석했습니다
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <pre className="text-sm text-gray-700 whitespace-pre-wrap overflow-auto max-h-96 leading-relaxed">
{JSON.stringify(result, null, 2)}
                    </pre>
                </div>
            </div>

            {/* 추가 액션 */}
            <div className="flex gap-3">
                <button
                    onClick={() => {
                        const dataStr = JSON.stringify(result, null, 2);
                        const dataBlob = new Blob([dataStr], { type: "application/json" });
                        const url = URL.createObjectURL(dataBlob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = "financial-analysis.json";
                        link.click();
                        URL.revokeObjectURL(url);
                    }}
                    className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                    결과 다운로드
                </button>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(result, null, 2));
                        alert("결과가 클립보드에 복사되었습니다!");
                    }}
                    className="flex-1 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                    복사하기
                </button>
            </div>
        </div>
    );
}