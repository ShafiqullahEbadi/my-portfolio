import { apiFetch } from "@/lib/api"
import { useState } from "react"

interface Projects {
    id: number
    name: string
    description: string
    status: string
    created_at: string
    updated_at: string
}

const useGetProjects = async () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    try {
        setLoading(true)
        const response = await apiFetch('/projects')
        setProjects(response)
        setLoading(false)
    } catch (error) {
        
    }
}