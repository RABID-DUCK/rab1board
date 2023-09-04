import { useEffect } from "react";
import api from "../API/Api";

const TestDesk = ({column, id}) => {
    // console.log(column);
    // console.log(id);
    const fetch = async() => {
        const desk = await api.post('/desk', {
            dashboard_id: id
        })
        console.log(desk.data);
    }
    useEffect(() => {
        fetch()
    }, [])
    return (
        <>
        
        </>
    )
}

export default TestDesk