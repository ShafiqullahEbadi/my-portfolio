import { apiFetch } from "@/lib/api";
import { useState } from "react";

interface Reel {
    title: string;
    reel: string;
}

const useGetReel = async () => {
    const [reel, setReel] = useState<Reel>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    try {
        setLoading(true);
        const response = await apiFetch<Reel>("/reel");
        setReel(response);
    } catch (error: any) {
        setError(error.message || "Failed to fetch reel");
    } finally {
        setLoading(false);
    }
}