import { useEffect, useState } from "react"
import { useParams } from "react-router"
import api from "../API/Api"

const Dashboard = () => {
    const match = useParams()
    const id = match.id
    const [dash, setDash] = useState([])
    useEffect(() => {
        const fetch = async () => {
            const allDash = await api.get(`/getDashboards`)
            setDash(allDash.data)
        }
        fetch()
    }, [])
    console.log(dash);
    return (
        <>
            <h1>Project</h1>
        </>
    )
}

export default Dashboard