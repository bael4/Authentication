import {createSlice, createAsyncThunk,current} from "@reduxjs/toolkit";
import {REG_API, LOGIN_API} from "../../config";

export const registration = createAsyncThunk(
    'reg/registration',
    async (login, {rejectedWithValue, dispatch}) => {
        try {
            const res = await fetch(login.key==='auth'?LOGIN_API:REG_API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login.key==='auth'?login.authData:login)
            })
            const data = await res.json()
            if (data.token) {
                localStorage.setItem('token', data.token)
            }else {
                dispatch(handleErrors(data.errors.errors))
            }
            console.log(data)
            return data
        } catch (e) {
            return rejectedWithValue(e.message)
        }
    }
)

const setError = (state, action) => {
    console.log('REJECTED')

    state.status = 'rejected'
    state.error = action.payload
}

const regSlice = createSlice({
    name: 'reg',
    initialState: {
        login: {
            name: '',
            email: '',
            pass: '',
        },
        status: null,
        error: null,
        listErrors:[],
    },
    reducers: {
        handleName(state, action) {
            state.login.name = action.payload
        },
        handleEmail(state, action) {
            state.login.email = action.payload
        },
        handlePass(state, action) {
            state.login.pass = action.payload
        },
        handleErrors(state, action){
            console.log(current(state.listErrors))
            state.listErrors = action.payload
        },
        handleToggle(state){
            state.status = null
            state.listErrors = []
        },
    },
    extraReducers: {
        [registration.fulfilled]: (state, action) => {
            console.log('FULFILLED')

            state.status = 'resolved'
        },
        [registration.pending]: (state) => {
            console.log('PENDING')

            state.status = 'loading';
            state.error = null;
        },
        [registration.rejected]: setError,
    }
})

export const {handleName, handleEmail, handlePass, handleErrors, handleToggle} = regSlice.actions
export default regSlice.reducer