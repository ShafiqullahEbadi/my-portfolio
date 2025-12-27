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
        
    } catch (error) {
        
    }
};