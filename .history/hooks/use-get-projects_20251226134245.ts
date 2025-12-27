import { apiFetch } from "@/lib/api"
import { useState } from "react"

export interface Project{
    _id: string;
    title: string;
    description: string;
    company: string;
    technologies: string[];
    startDate: string;
    endDate: string;
}

const useGetProjects = async () => {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    try {
        setLoading(true)
        const response = await apiFetch<Project[]>('/projects')
        setProjects(response)
        setLoading(false)
    } catch (error: any) {
        setError(error.message)
    } finally{
        setLoading(false)
    }
}