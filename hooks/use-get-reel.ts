import { apiFetch } from "@/lib/api";
import { useState, useEffect } from "react";

export interface Reel {
  title: string;
  reel: string; // video URL
}

const useGetReel = () => {
  const [reel, setReel] = useState<Reel[] | null>(null); // store as array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReel = async () => {
      try {
        setLoading(true);

        // Fetch data from API
        const response = await apiFetch<Reel | Reel[]>("/reel");

        if (Array.isArray(response)) {
          // If multiple videos, store all
          setReel(response);
        } else if (response) {
          // If single video, wrap in array
          setReel([response]);
        } else {
          // No data
          setReel([]);
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch reel");
        setReel([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReel();
  }, []);

  return { reel, loading, error };
};

export default useGetReel;
