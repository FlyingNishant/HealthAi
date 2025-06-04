import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    isLoggedIn: false,
    userDetails: null,
}

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userDetails = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false,
            state.userDetails = null
        }
    }
})

const {actions, reducer} = authSlice;

export const {login, logout} = actions;

export default reducer;