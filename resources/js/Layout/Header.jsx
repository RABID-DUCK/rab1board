import { useEffect, useState } from "react"
import { Link, NavLink} from "react-router-dom"
import cookie from "js-cookie"
import api from "../API/Api"

const Header = () => {
    const [Auth, setAuth] = useState(false)
    const [user, setUser] = useState([])
    const LogOut = () => {
        cookie.remove("toke")
        window.location.reload()
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const da = await api.post(`/user/getUser`, {})
                if(da.data.length === 2) {
                    setUser(da.data[1])
                    setAuth(true)
                }
                else {

                }
                }

             catch (error) {
                console.log(error);
                setAuth(false)
            }
        }
        fetchData()
    }, [])

    return (
        <header className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">CapiBoard</NavLink>
                <button className="navbar-toggler" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                       aria-expanded="false">
                        Your boards
                    </Link>

                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" href="#">Action</Link></li>
                    </ul>
                </li>

                <li className="nav-item dropdown">
                    <select className="form-select" defaultValue="ru" aria-label="Default select example">
                        <option value="ru" >Russian</option>
                        <option value="en">English</option>
                    </select>

                </li>
            </ul>

            <form className="d-flex w-50" role="search">
                <input className="form-control search me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-search" type="submit">Search</button>
            </form>

            <div className="user">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                    {Auth ? (
                        <>
                            <Link className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {user.login}
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="">Action</Link></li>
                                <li><Link className="dropdown-item" href="">Admin</Link></li>
                                <li>
                                    <button className="dropdown-item" onClick={LogOut}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="dropdown-item auth-link">Войти</Link>
                            <Link to="/reg" className="dropdown-item auth-link">Зарегистрироваться</Link>
                        </>
                        )}

                    </li>
                </ul>
            </div>
        </div>

            </div>
        </header>
    )
}
export default Header;
