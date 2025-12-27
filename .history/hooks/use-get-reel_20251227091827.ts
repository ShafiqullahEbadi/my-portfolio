import { useState } from "react";

interface Reel {
    title: string;
    reel: string;
}

const useGetReel = () => {
    const [reel, setReel] = useState<Reel>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    try {
        setLoading(true);
        const response = await apiFetch<Reel>("/reel");
        setReel(response);
    } catch (error) {
        
    }
}