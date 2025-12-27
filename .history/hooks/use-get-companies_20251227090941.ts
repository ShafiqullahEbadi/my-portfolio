import { apiFetch } from "@/lib/api";
import { useState, useEffect } from "react";

export interface Company {
  _id: string;
  company_name: string;
  company_logo: string;
}

const useGetCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await apiFetch<Company[]>("/companies");
        setCompanies(response);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, loading, error };
};

export default useGetCompanies;
