import { apiFetch } from "@/lib/api";
import { useState } from "react"

const useGetExperience = () => {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    try {
        setLoading(true);
        const response = await apiFetch.get("/api/experience");
        setExperience(response.data);
        setLoading(false);
    } catch (error) {
        
    }
}