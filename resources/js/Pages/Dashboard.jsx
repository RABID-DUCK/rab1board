import { useEffect, useState } from "react"
import { useParams } from "react-router"
import api from "../API/Api"
import Column from "../components/Column"

const Dashboard = () => {
    const match = useParams()
    const id = match.id
    const [dash, setDash] = useState([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        const fetch = async () => {
            const allDash = await api.post(`/desk`, {
                dashboard_id: parseInt(id)
            })
            console.log(allDash.data);
            setDash(allDash.data)
        }
        fetch()
    }, [])
    const addColumn = async() => {
        const column = await api.post('/column/create', {
            dashboard_id: parseInt(id),
            title: title
        })
        setTitle('')
        console.log(column.data);
    }
    console.log(dash);
    return (
        <>
            <h1>Project</h1>
            {dash.map((column) => (
                <Column id={id} key={column.id} column={column}/>
            ))}
            <input type="text" value={title} onChange={(e) => {setTitle(e.target.value)}}  />
            <button onClick={addColumn}>Добавить доску</button>
        </>
    )
}

export default Dashboard