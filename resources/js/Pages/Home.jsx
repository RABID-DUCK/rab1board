
import { Link } from "react-router-dom";
import { AuthSlice } from "../store/Slice/AuthSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../API/Api";

const Home = () => {
    const Auth = useSelector(state => state.value)
    const [add, setAdd] = useState(false)
    const [user, setUser] = useState()
    const [desk, setDesk] = useState([])

    const [board, setboard] = useState()

    const toggleAdd = ()  => {
        setAdd(!add)
    }

    useEffect(() => {
        const fetch = async() => {
            const id = await api.post("/user/getUser",{})
            setUser(id.data[1].id)
            const allDash = await api.get(`/dashboard/13`)
            setDesk(allDash.data)
            console.log(allDash);
        }
        fetch()
    }, [])
    
    const addBoard = async() => {
        const da = await api.post("/dashboard/create", {
            title: board,
            user_id: user
        })
    }
    return (
        <>
            {
                Auth ? 
                <> {false? <h1>нету досок</h1> :
                    <>dasd</>
                }
                    <button onClick={toggleAdd}>Добавить доску</button>
                    {add ? <>
                        
                            <p>Название доски</p>
                            <input type="text" value={board} onChange={(e) => setboard(e.target.value)}/>
                            <button onClick={addBoard}>Add</button>
                        
                    </>
                        :
                        <></>}

                </>
                :
                <>
                    <h1>Авторизуйся/Зарегестрируйся</h1>
                    <button>
                        <Link to="/login"> Login</Link>
                    </button>
                    <button>
                        <Link to="/reg">REg</Link>
                    </button>
                </>
            }
        </>
    )
}

export default Home;
