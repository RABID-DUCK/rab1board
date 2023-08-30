import { useEffect, useState } from "react"
import { useParams } from "react-router"
import api from "../API/Api"
import Column from "../components/Column"

const Dashboard = () => {
    const match = useParams()
    const id = match.id
    const [col, setColumn] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const fetch = async () => {
            const allDash = await api.post(`/desk`, {
                dashboard_id: parseInt(id)
            })
            
            setColumn(allDash.data.columns)
        }
        fetch()
    }, [])
    const addColumn = async() => {
        const column = await api.post('/column/create', {
            dashboard_id: parseInt(id),
            title: title
        })
        setTitle('')
    }
    return (
        <>
            <h1>Project</h1>
            {col.map((column) => (
                <Column id={id} key={column.id} column={column}/>
            ))}
            <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}  />
            <button onClick={addColumn}>Добавить доску</button>
        </>
    )
}

export default Dashboard