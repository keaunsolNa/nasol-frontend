export async function fetchFinalAnalysis() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/analysis/final`,
        {
            credentials: "include",
        }
    );

    return await res.json();
}
