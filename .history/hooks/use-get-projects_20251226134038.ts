import { useState } from "react"

const useGetProjects = async () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    try {
        setLoading(true)
        const response = await fetch('projects')
        const data = await response.json()
        setProjects(data)
        setLoading(false)
    } catch (error) {
        
    }
}