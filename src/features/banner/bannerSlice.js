import { bannerService } from "./bannerService";
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';


const initialState = {
    isLoading : false,
    isSuccess : false,
    isError   : false,
    msg : "",
    banners : []
}

export const getAllBanners = createAsyncThunk('banner/get-all-banners',async(_,thunkapi) => {
    try {
        return await bannerService.getAllBanners();
    }catch(err) {   
        return thunkapi.rejectWithValue(err);
    }
})

const bannerSlice = createSlice({
    initialState,
    name : "banner",
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getAllBanners.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllBanners.fulfilled, (state,action) => {
            state.isError = false;
            state.isSuccess = true;
            state.banners = action.payload;
            state.isLoading = false;
        })
        .addCase(getAllBanners.rejected,(state,action) => {
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.error;
            state.isLoading = false;
        })
    }
})

export default bannerSlice.reducer;