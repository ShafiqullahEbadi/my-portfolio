import { useState } from "react"

const useGetProjects = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    try {
        setLoading(true)
    } catch (error) {
        
    }
}