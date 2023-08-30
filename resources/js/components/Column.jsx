import { useEffect } from "react"
import api from "../API/Api"

const Column = ({column, id}) => {
    const fetch = async() => {
        const desk = await api.post('/column/getDesks',  {
            dashboard_id: parseInt(id),
            col_id: column.id

        })
        console.log(desk.data);
    }
    useEffect(() => {
        fetch()
    }, [])
    return (
        <>
            {column.id}
            {column.title}
            
            <button>Добавить задачу</button>
        </>
    )
}
export default Column