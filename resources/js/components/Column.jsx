import { useEffect } from "react"
import api from "../API/Api"
import TestDesk from "./TestDesk"

const Column = ({column, id}) => {
    // const fetch = async() => {
    //     const desk = await api.post('/desk',  {
    //         dashboard_id: parseInt(id)
    //     })
    //     console.log(desk.data.desk[column.id]);
    // }
    // useEffect(() => {
    //     fetch()
    // })
    return (
        <>
            {column.id}
            {column.title}
            <TestDesk id={id} column={column.id}></TestDesk>
            <button>Добавить задачу</button>
        </>
    )
}
export default Column