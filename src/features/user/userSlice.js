import { toast } from 'react-toastify';
import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import { userService } from './userService';
const initialState = {
    isLoading  : false,
    isError :  false,
    isSuccess : false,
    message : "",
    wishlist : [],
    createdCart : [],
    updatedCart : {},
    updatedUser : {},
    getUser : {},
    
    cart : []
}
export const getUserWishlist = createAsyncThunk('user/wishlist', 
    async(thunkAPI) => {
        try {
            return await userService.getUserWishList();
        }catch(err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
)
export const addToCart = createAsyncThunk('user/cart/add-to-cart',
    async(cartData,thunkAPI) => {
        try {
            return await userService.addToCart(cartData);
        }catch(err) {
            console.log(err)
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getUserCart = createAsyncThunk('user/cart/get-user-cart',
    async(thunkAPI) => {
        try {
            return await userService.getUserCart();
        }catch(err) {
            console.log(err);
            return thunkAPI.rejectWithValue(err);
        }
    }
)


export const removeFromCart = createAsyncThunk('user/cart/remove-from-cart',
    async(id,thunkAPI) => {
        try {
            return await userService.removeFromCart(id);
        }catch(err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const emptyUserCart = createAsyncThunk('user/cart/empty-cart', 
    async(thunkAPI) => {
        try {
            return await userService.emptyCart();
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

export const updateUserCart = createAsyncThunk('user/cart/update-user-cart',
    async(props,thunkAPI) => {
        try {
            return await userService.updateUserCart(props);
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    } 
)

export const updateUser = createAsyncThunk('user/update-user',
    async(data,thunkAPI) => {
        try {
            return await userService.updateUser(data);
        }catch(err) {   
            thunkAPI.rejectWithValue(err);
        }
    }
)

export const getUser = createAsyncThunk('user/get-user',
    async(thunkAPI) => {
        try {
            return await userService.getUser();
        }catch(err) {
            thunkAPI.rejectWithValue(err);
        }
    }
)

export const getForgotPasswordToken = createAsyncThunk('user/forgot-password',  
    async(email,thunkAPI) => {
        try {
            return await userService.forgotPasswordToken(email);
        }catch(err) {
           return thunkAPI.rejectWithValue(err);
        }
    }
)

export const resetPassword = createAsyncThunk('user/reset-password',
    async(data,thunkAPI) => {
        try {
            return await userService.resetPassword(data);
        }catch(err) {
           return thunkAPI.rejectWithValue(err);
        }
    }
)
const userSlice = createSlice({
    name : 'user',
    initialState ,
    reducers : {},
    extraReducers : (builder) => {
        builder
        .addCase(getUserWishlist.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserWishlist.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishlist = action.payload;
        })
        .addCase(getUserWishlist.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdCart = action.payload;
            if(state.createdCart) {
                toast.success('added product to cart successfully')
            }
        })
        .addCase(addToCart.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getUserCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserCart.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cart = action.payload;
        })
        .addCase(getUserCart.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(removeFromCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(removeFromCart.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            
        })
        .addCase(removeFromCart.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateUserCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUserCart.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedCart = action.payload;
        })
        .addCase(updateUserCart.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(emptyUserCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(emptyUserCart.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            
        })
        .addCase(emptyUserCart.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = '';
            state.updateUser = action.payload;
        })
        .addCase(updateUser.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUser.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = '';
            state.getUser = action.payload;
        })
        .addCase(getUser.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(getForgotPasswordToken.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getForgotPasswordToken.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = '';
          
        })
        .addCase(getForgotPasswordToken.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        .addCase(resetPassword.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(resetPassword.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = '';
          
        })
        .addCase(resetPassword.rejected,(state,action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.error;
        })
        
    }
})

export default userSlice.reducer;