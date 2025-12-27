import { apiFetch } from "@/lib/api";
import { useState, useEffect } from "react";

interface Experience {
  _id?: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate: string;
}

const useGetExperience = () => {
  const [experiences, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const response = await apiFetch<Experience[]>("/api/experience");
        setExperience(response);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, []);

  return { experience, loading, error };
};

export default useGetExperience;
