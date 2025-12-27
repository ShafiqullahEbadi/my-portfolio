import { apiFetch } from "@/lib/api";
import { useState, useEffect } from "react";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  company?: string;
  technologies?: string[];
  startDate?: string;
  endDate?: string;
}

const useGetProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await apiFetch<Project[]>("/project");
        setProjects(response);
      } catch (error: any) {
        setError(error.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};

export default useGetProjects;
