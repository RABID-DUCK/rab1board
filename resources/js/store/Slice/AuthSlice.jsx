import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice(
    {
        name: "Auth",
        initialState: {
            value: false
        },
        reducers: {
            Authorization: (state, action) => {
                state.value = action.payload
            }
        }
    }
)
export const {Authorization} = AuthSlice.actions;
export default AuthSlice.reducer;