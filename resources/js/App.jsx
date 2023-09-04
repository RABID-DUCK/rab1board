import React from "react";
import Layout from "./Layout/Layout";
import { Routes, Route } from "react-router";
import Home from "./Pages/Home";
import Auth from "./components/Auth"
import Register from "./components/Register";
import Test from "./Pages/Test";
import Dashboard from "./Pages/Dashboard";


const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}></Route>
                <Route path="/login" element={<Auth/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/test" element={<Test/>}/>
                <Route path="/dashboard/:id" element={<Dashboard/>}/>
            </Route>
        </Routes>
            
    )
}
export default App;