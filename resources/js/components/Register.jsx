import { useState } from "react"

const Register = () => {
    const [Name, setName] = useState()
    const [login, setLogin] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [password_conf, setPassword_conf] = useState()
    const Login =  async(e) => {
        try{
            const auth = await axios.post('api/user/register', {
                        name: Name,
                        login: login,
                        email: email,
                        password: password,
                        password_confirmation: password_conf
                    })
                    console.log(auth);
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <form onSubmit={Login}>
            <input type="text" value={Name} onChange={(e) => {setName(e.target.value)}} />
            <input type="text" value={login} onChange={(e) => {setLogin(e.target.value)}} />
            <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            <input type="password" value={password_conf} onChange={(e) => {setPassword_conf(e.target.value)}}/>
            <button type="submit">Login</button>
        </form>
    )
}

export default Register;