import axios from "axios";
import cookie from "js-cookie";

const tokenReg = cookie.get("access_token")
// const tokenLogin = cookie.get('toke')

const api = axios.create({
    baseURL: "/api/",
    headers: {
        Authorization: `Bearer ${tokenReg}`
    }
})

export default api;
