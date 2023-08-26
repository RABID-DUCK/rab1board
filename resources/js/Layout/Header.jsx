import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import axios, { AxiosError } from "axios"
import cookie from "js-cookie"
import { set } from "lodash"

const Header = () => {
    const [Auth, setAuth] = useState(false)
    const token = cookie.get('access_token')
    console.log(token);
    const LogOut = () => {
        cookie.remove("access_token")
        window.location.reload()
    }
    console.log(token);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const da = await axios.post("api/user/getUser", {
                    // header: {
                    //     Authorization: `Bearer maxlox`
                    // }
                })
                if(da.data.user === null){
                    console.log("maksGey");
                    setAuth(false)
                }
                else {
                    setAuth(true)
                }
                
            } catch (error) {
                console.log(error);
                setAuth(false)
            }
        }
        fetchData()
    }, [])
    console.log(Auth);
    return (
        <header className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">CapiBoard</NavLink>
                <button className="navbar-toggler" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mb-2 mb-lg-0">
                <li class="nav-item dropdown">
                    <Link class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                       aria-expanded="false">
                        Your boards
                    </Link>

                    <ul class="dropdown-menu">
                        <li><Link class="dropdown-item" href="#">Action</Link></li>
                    </ul>
                </li>

                <li class="nav-item dropdown">
                    <select class="form-select" aria-label="Default select example">
                        <option value="ru" selected>Russian</option>
                        <option value="en">English</option>
                    </select>

                </li>
            </ul>

            <form class="d-flex w-50" role="search">
                <input class="form-control search me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-search" type="submit">Search</button>
            </form>

            <div class="user">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                    {Auth ? (
                        <>
                            <Link className="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                User
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" href="">Action</Link></li>
                                <li><Link className="dropdown-item" href="">Admin</Link></li>
                                <li>
                                    <button className="dropdown-item" href="/logout" onClick={LogOut}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <Link to="/login" class="dropdown-item auth-link">Войти</Link>
                            <Link to="/reg" class="dropdown-item auth-link">Зарегистрироваться</Link>
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
