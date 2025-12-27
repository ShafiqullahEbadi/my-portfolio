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
        const response = await fetch("http://localhost:3000/api/companies");
        const data = await response.json();
        setCompanies(data);
        setLoading(false);
    } catch (error) {
        
    }
};