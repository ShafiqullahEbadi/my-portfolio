import { apiFetch } from "@/lib/api";
import { useState } from "react";

export interface Company {
  _id: string;
  company_name: string;
  company_logo: string;
}

const useGetCompanies = async () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    try {
        setLoading(true);
        const response = await apiFetch<Company[]>("/companies");
        setCompanies(response);
        setLoading(false);
    } catch (error) {
        setError(error as string);
    } finally {
        setLoading(false);
    }
    return { companies, loading, error };
};