import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {authService} from './authService';
import { toast } from 'react-toastify';
const getCustomerFromStorage = localStorage.getItem('customer') 
    ? JSON.parse(localStorage.getItem('customer')) 
    : null;
const initialState = {
    loginUser : {},
    registerUser  : getCustomerFromStorage,
    isLoading  : false,
    isError :  false,
    isSuccess : false,
    message : ""
}
export const registerUser = createAsyncThunk('auth/register',
    async(userData,thunkAPI) => {
        try {
            return await authService.register(userData);
        }catch(err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
)
export const loginUser = createAsyncThunk('auth/login',
    async(userData , thunkAPI) => {
        try {
            return await authService.login(userData);
        }catch(err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
)

const authSlice = createSlice({
    name : 'auth',
    initialState ,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(registerUser.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(registerUser.fulfilled, (state,action)  => {
            state.isError = false;
            state.isSuccess = true;
            state.isLoading = false;
            state.registerUser = action.payload;
            if(state.isSuccess == true) {
                toast.info('user created successfully')
            }
        })
        .addCase(registerUser.rejected,(state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isSuccess == false) {
                toast.info('failed to create user')
            }
        })
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.loginUser = action.payload;
            if(state.isSuccess) {
                localStorage.setItem('token',action.payload.token)
                toast.info('login successfully')
            }
        })
        .addCase(loginUser.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        
    }
})

export default authSlice.reducer;