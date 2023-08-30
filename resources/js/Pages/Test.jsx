// сюда компоненты импортировать
import TestButton from "../components/TestButton"
import DashboardBody from "../components/DashboardBody"
import api from "../API/Api";
const Test = () => {

    const desk = async() => {
        const req = await api.post("/column/getDesks", {
            dash_id: 16,
            col_id: 26
        })
        console.log(req.data)
    }
    return (
        <>
            {/* СЮДА ТЕСТИТЬ ВЕРСТКУ */}
            {/* <INPUT/> - ТАКОЙ ФОРМАТ*/}
            <DashboardBody />
        </>
    )
}
export default Test
