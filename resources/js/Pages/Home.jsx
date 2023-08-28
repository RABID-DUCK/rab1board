
import { Link } from "react-router-dom";
import { AuthSlice } from "../store/Slice/AuthSlice";
import { useSelector } from "react-redux";

const Home = () => {
    const Auth = useSelector(state => state.value)
   console.log(Auth);
    
    return (
        <>
            {
                Auth ? 
                <><h1>Login</h1></>
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
