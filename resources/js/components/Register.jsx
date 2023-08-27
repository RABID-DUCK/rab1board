import { useState } from "react"
import cookie from "js-cookie"

const Register = () => {
    const [Name, setName] = useState()
    const [login, setLogin] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [password_conf, setPassword_conf] = useState()
    const Login =  async(e) => {
        e.preventDefault()

        try{
            const auth = await axios.post('api/user/register', {
                        name: Name,
                        login: login,
                        email: email,
                        password: password,
                        password_confirmation: password_conf
                    })
                    
                    cookie.set('access_token', auth.data.access_token, {
                        expires: 1
                    })
        }
        catch(error){
            console.log(error);
        }

    }

    return (
        <form onSubmit={Login}>
            <p>name</p>
            <input type="text" value={Name} onChange={(e) => {setName(e.target.value)}} />
            <p>login</p>
            <input type="text" value={login} onChange={(e) => {setLogin(e.target.value)}} />
            <p>email</p>
            <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <p>password</p>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <p>confirm</p>
            <input type="password" value={password_conf} onChange={(e) => {setPassword_conf(e.target.value)}}/>
            <button type="submit">Login</button>
            
        </form>
    )

}

export default Register;