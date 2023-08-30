import api from "../API/Api"

const Column = ({column, id}) => {
    const addDesk = async() => {
        const desk = await api.post('/desk/create', {
            title: '1',
            column_id: column.id,
            dashboard_id: id
        }) 
        console.log(desk);
    }
    return (
        <>
            {column.column_desk.title}
            {column.title}
            <button onClick={addDesk}>Добавить задачу</button>
        </>
    )
}
export default Column