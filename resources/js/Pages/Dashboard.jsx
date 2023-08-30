import { useEffect, useState } from "react"
import { useParams } from "react-router"
import api from "../API/Api"

const Dashboard = () => {
    const match = useParams()
    const id = match.id
    const [dash, setDash] = useState([])
    
    useEffect(() => {
        const fetch = async () => {
            const allDash = await api.post(`/desk`, {
                dashboard_id: parseInt(id)
            })
            setDash(allDash.data)
        }
        fetch()
    }, [])
    const addColumn = async() => {
        const column = await api.post('/column/create', {
            dashboard_id: parseInt(id),
            title: 'первая колонка'
        })
        console.log(column.data);
    }
    console.log(dash);
    return (
        <>
            <h1>Project</h1>
            <button onClick={addColumn}>Добавить доску</button>
        </>
    )
}

export default Dashboard