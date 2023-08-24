import './bootstrap';

import React from 'react';
import  ReactDOM  from 'react-dom';
import App from "./App.jsx"
import browserRouter from "react-router-dom"

ReactDOM.render(
    <browserRouter>
        <App/>
    </browserRouter>,
    document.querySelector('#root')
)