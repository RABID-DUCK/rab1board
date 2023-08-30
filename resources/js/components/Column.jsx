import { useEffect, useState } from "react"
import api from "../API/Api"


const Column = ({column, id}) => {

    const [desk, setDesk] = useState([])
    const fetch = async() => {
        const Desk = await api.post('/column/getDesks',  {
            dash_id: parseInt(id),
            col_id: column.id
        })
        setDesk(Desk.data[0])
        
    }
    useEffect(() => {
        fetch()
    }, [])
    console.log(desk);
   
    return (
        <>
            {column.id}
            {column.title}
            
            <button>Добавить задачу</button>
        </>
    )
}
export default Column