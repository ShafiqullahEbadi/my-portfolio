import { apiFetch } from "@/lib/api";
import { useState } from "react"

interface Experience {
  _id?: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
}
 


const useGetExperience = async () => {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    try {
        setLoading(true);
        const response = await apiFetch<{ٍExpei}>("/api/experience");
        setExperience(response.data);
        setLoading(false);
    } catch (error) {
        
    }
}