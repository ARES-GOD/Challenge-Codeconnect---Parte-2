import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserState } from "../interface/IUserState";

const initialState: IUserState = {
    name:"",
    email:"",
    password:"",
}

export const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers: {
        addToUsers: (state,action:PayloadAction<IUserState>) => {}
    }
})

export const {
    addToUsers,
} = usersSlice.actions;

export default usersSlice.reducer;