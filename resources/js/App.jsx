import React from "react";
import Layout from "./Layout/Layout";
import { Routes, Route } from "react-router";
import Home from "./Pages/Home";
import Auth from "./components/Auth"
import Register from "./components/Register";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}></Route>
                <Route path="/login" element={<Auth/>}/>
                <Route path="/reg" element={<Register/>}/>
            </Route>
        </Routes>
            
    )
}
export default App;