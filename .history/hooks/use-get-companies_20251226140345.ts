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
        const response = await apiFetch<Company[]>("http://localhost:3000/api/companies");
        setCompanies(data);
        setLoading(false);
    } catch (error) {
        
    }
};