import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";



const initialState = {
    firstName: '',
    lastName: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setFirtsName: (state, action) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action) => {
            state.lastName = action.payload;
        },
    }
})


export const { setFirtsName, setLastName } = userSlice.actions;
export default userSlice.reducer;