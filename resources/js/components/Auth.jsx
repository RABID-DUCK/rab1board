import { useState } from "react"
import { useNavigate } from "react-router"
import cookie from "js-cookie"
import api from "../API/Api"

const Auth = () => {
    const nav = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const Login =  async(e) => {
        e.preventDefault()
        try{
            const auth = await api.post(("/user/login"),{
                        email: email,
                        password: password,
                    })
            cookie.set('access_token', auth.data.access_token, {
                expires: 1
            })
            nav("/")
            window.location.reload()
        }
        catch(error){
            console.log(error);
        }
    }
    
    return (
        <div className="wrapper">
            <form onSubmit={Login}>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <button type="submit">Login</button> 
            </form>
        </div>
    )
}

export default Auth;
