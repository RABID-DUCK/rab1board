import { useState } from "react"
import cookie from "js-cookie"

const Auth = () => {
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const Login =  async(e) => {
        try{
            const auth = await axios.post('api/user/login', {
                        email: email,
                        password: password
                    })
                    
                const token = cookie.set('access_token', auth.data.access_token, {
                    expires: 1
                })
                console.log(token)
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
