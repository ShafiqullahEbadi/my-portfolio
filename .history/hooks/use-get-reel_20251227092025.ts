import { apiFetch } from "@/lib/api";
import { useState, useEffect } from "react";

export interface Reel {
  title: string;
  reel: string;
}

const useGetReel = () => {
  const [reel, setReel] = useState<Reel | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReel = async () => {
      try {
        setLoading(true);
        const response = await apiFetch<Reel>("/reel");
        setReel(response);
      } catch (err: any) {
        setError(err.message || "Failed to fetch reel");
      } finally {
        setLoading(false);
      }
    };

    fetchReel();
  }, []);

  return { reel, loading, error };
};

export default useGetReel;
