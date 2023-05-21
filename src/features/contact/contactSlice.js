import {contactService} from './contactService';
import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';

export const createEnquiry = createAsyncThunk(('enquiry/create-enquiry'),(data) => {
   
       return contactService.createEnquiry(data)
       
})
const initialState =  {
    isLoading : false,
    isError : false,
    isSuccess : false,
    message : '',
    createdEnquiry: {},
}

const contactSlice = createSlice({
    initialState,
    name : "enquiry",
    reducers : {},
    extraReducers : (builder) => {
        builder 
        .addCase(createEnquiry.pending , (state) => {
            state.isLoading = true;
        })
        .addCase(createEnquiry.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdEnquiry = action.payload;
            if(state.createdEnquiry) {
                toast.success('inform successfully..')
            }
        })
        .addCase(createEnquiry.rejected, (state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export default contactSlice.reducer;