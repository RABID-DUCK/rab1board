import './bootstrap';

import React from 'react';
import  ReactDOM  from 'react-dom';
import { createRoot }  from "react-dom/client"
import App from "./App.jsx"
import {BrowserRouter} from "react-router-dom"
import store from "./store/store";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>  
    </BrowserRouter>
)

