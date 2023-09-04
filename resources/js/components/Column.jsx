import { useEffect, useState } from "react"
import api from "../API/Api"


const Column = ({column, id}) => {

    const [desk, setDesk] = useState([])
    const fetch = async() => {
        const Desk = await api.post('/column/getDesks',  {
            dash_id: parseInt(id),
            col_id: column.id
        })
        setDesk(Desk.data)
    }
    useEffect(() => {
        fetch()
    }, [])
    
    const addDesk = async() => {
        const da = await api.post("/desk/create", {
            title: "Zadacha",
            dashboard_id: id,
            column_id: column.id
        })
        fetch()
    }

   
    return (
        <>
            {column.id}
            {column.title}
            {desk.map((de) => (
                <li>{de.title}</li>
            ))}
            <button onClick={addDesk}>Добавить задачу</button>
        </>
    )
}
export default Column