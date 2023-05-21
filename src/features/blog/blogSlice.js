import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { blogService } from './blogService';

const initialState =  {
  blogs : [],
  isError : false,
  isSuccess : false,
  isLoading : false,
  message :  '',
  blog : {}   
}
export const getAllBlogs =  createAsyncThunk('blog/get-all-blogs' , async(thunkAPI) => {
    try {
        return await blogService.getBlogs();
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

export const getBlog = createAsyncThunk('blog/get-blog',async(id,thunkAPI) => {
    try {
        return await blogService.getBlog(id);
    }catch(err) {
        return thunkAPI.rejectWithValue(err);
    }
})

const blogSlice = createSlice({
    name : 'blog',
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getAllBlogs.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getAllBlogs.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blogs = action.payload;
        })
        .addCase(getAllBlogs.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getBlog.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getBlog.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.blog = action.payload;
        })
        .addCase(getBlog.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export default blogSlice.reducer;