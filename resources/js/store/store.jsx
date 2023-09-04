import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Slice/AuthSlice"

export default configureStore({
    reducer: rootReducer
})