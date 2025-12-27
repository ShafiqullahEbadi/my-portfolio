import { apiFetch } from "@/lib/api"
import { useState } from "react"

interface Projects

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