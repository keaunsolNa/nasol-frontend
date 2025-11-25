export async function saveManualInput(type: string, fields: Record<string, string>) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/documents-multi-agents/manual`,
        {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type_of_doc: type, fields }),
        }
    );

    return await res.json();
}
