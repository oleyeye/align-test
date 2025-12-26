import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";


interface HomeState {
    value: number;
}

const initialState: HomeState = {
    value: 0,
}

export const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        }
    }
})

export const { increment} = homeSlice.actions;
export const selectCount = (state: RootState) => state.home.value;

export default homeSlice.reducer;