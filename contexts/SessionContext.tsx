"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface SessionContextValue {
    sessionId: string | null;
}

const SessionContext = createContext<SessionContextValue>({
    sessionId: null,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSession() {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/authentication/status`,
                { credentials: "include" }
            );
            const data = await res.json();

            if (data.logged_in) {
                setSessionId(data.session_id ?? null);
            }
        }
        fetchSession();
    }, []);

    return (
        <SessionContext.Provider value={{ sessionId }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => useContext(SessionContext);
