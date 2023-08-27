import { useState } from "react"
import { useNavigate } from "react-router"
import cookie from "js-cookie"
import axios from "axios"

const Auth = () => {
    const nav = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const token = cookie.get("access_token")
    const test = axios.create({
        baseURL: "api/user",
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    const Login =  async(e) => {
        e.preventDefault()
        try{
            const auth = await test.post(("/login"),{
                        email: email,
                        password: password,
                    })

            cookie.set('toke', auth.data.access_token, {
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
        <form onSubmit={Login}>
            <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <button type="submit">Login</button>
            
        </form>
    )

}

export default Auth;
