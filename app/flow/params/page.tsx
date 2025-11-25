"use client";

import { useState } from "react";
import StepActions from "@/components/step/StepActions";
import { useRouter } from "next/navigation";

export default function ParamsPage() {
    const router = useRouter();

    const [goal, setGoal] = useState("");
    const [risk, setRisk] = useState("보통");

    async function handleNext() {
        if (!goal) {
            alert("목표 금액을 입력하세요.");
            return;
        }

        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/params/save`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ goal, risk }),
        });

        router.push("/flow/result");
    }

    const riskOptions = [
        { value: "안정", label: "안정형", desc: "원금 보존을 최우선" },
        { value: "보통", label: "중립형", desc: "안정과 수익 균형" },
        { value: "공격", label: "공격형", desc: "높은 수익 추구" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    사용자 정보 입력
                </h2>
                <p className="text-gray-600">
                    재무 목표와 투자 성향을 알려주세요.
                </p>
            </div>

            {/* 목표 금액 */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    목표 금액
                </label>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="예: 50000000"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-lg"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                        원
                    </span>
                </div>
                <p className="text-sm text-gray-500">
                    달성하고 싶은 재무 목표를 입력하세요
                </p>
            </div>

            {/* 위험 성향 */}
            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                    투자 위험 성향
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {riskOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => setRisk(option.value)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                                risk === option.value
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300"
                            }`}
                        >
                            <div className="text-center">
                                <div
                                    className={`font-semibold mb-1 ${
                                        risk === option.value
                                            ? "text-blue-600"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {option.label}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {option.desc}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <StepActions
                onPrev={() => router.push("/flow/expense")}
                onNext={handleNext}
                nextLabel="최종 분석 보기"
            />
        </div>
    );
}