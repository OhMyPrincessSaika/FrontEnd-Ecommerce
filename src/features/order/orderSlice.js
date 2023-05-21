import { orderService } from "./orderService";
import {createAsyncThunk,createSlice, isAction} from '@reduxjs/toolkit';


const initialState = {
    isLoading : false,
    createdOrder : {},
    isError : false,
    isSuccess : false,
    message : '',
    myOrder : {}
}

export const createOrder = createAsyncThunk('order/create-order',
    
    async(data,thunkAPI) => {
        try {
            console.log(data);
            return await orderService.createOrder(data);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

export const getMyOrder = createAsyncThunk('order/get-my-order',
    async(thunkAPI) => {
        try {
            return await orderService.getMyOrder();
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

const orderSlice = createSlice({
    name : 'order',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(createOrder.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(createOrder.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "";
            state.createdOrder =action.payload;
        })
        .addCase(createOrder.rejected,(state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getMyOrder.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getMyOrder.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.isError = false;
            state.message = "";
            state.myOrder = action.payload;
        })
        .addCase(getMyOrder.rejected,(state,action) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export default orderSlice.reducer;