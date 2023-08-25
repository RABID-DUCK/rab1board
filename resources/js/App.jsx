import React from "react";
import Layout from "./Layout/Layout";
import { Routes, Route } from "react-router";
import Home from "./Pages/Home";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Home/>}></Route>
                <Route path="/login" element={<Form></Form>}></Route>
            </Route>
        </Routes>
            
    )
}
export default App;