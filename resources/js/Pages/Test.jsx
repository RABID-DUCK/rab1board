// сюда компоненты импортировать
import TestButton from "../components/TestButton"
import api from "../API/Api";
const Test = () => {

    const desk = async() => {
        const req = await api.post("/desk", {
            dashboard_id: 16
        })
        console.log(req.data)
    }
    return (
        <>
            {/* СЮДА ТЕСТИТЬ ВЕРСТКУ */}
            {/* <INPUT/> - ТАКОЙ ФОРМАТ*/}
            <TestButton desk={desk} />
        </>
    )
}
export default Test
