import { apiFetch } from "@/lib/api";
import { useState } from "react"

interface Experience {
    
}

const useGetExperience = async () => {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    try {
        setLoading(true);
        const response = await apiFetch<{data: any[]}>("/api/experience");
        setExperience(response.data);
        setLoading(false);
    } catch (error) {
        
    }
}