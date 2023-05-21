import { toast } from "react-toastify";
import { productService } from "./productService";
import {createSlice , createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
    products : [],
    product : {},
    isLoading : false,
    isError : false,
    isSuccess : false,
    message : '',
    categories: [],
    brands : [],
    tags : [],
    wishlists : []
}

export const getAllProducts = createAsyncThunk('product/get-all-products', 
    async(data,thunkAPI) => {
        try{
            return await productService.getAllProducts(data);
        }catch(err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getProduct = createAsyncThunk('product/get-product', 
    async(id,thunkAPI) => {
        try {
            return await productService.getProduct(id);
        }catch(err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)
export const addToWishList = createAsyncThunk('product/add-to-wishlist',
    (id,thunkAPI) => {
        const response = productService.addToWishList(id)
        .then((data) => console.log(data))
        .catch((err) => {
            toast.error(err);
            return thunkAPI.rejectWithValue(err);
        });
        return response;
    }
)
export const removeFromWishList = createAsyncThunk('product/remove-from-wishlist',
    (id,thunkAPI) => {
        const response = productService.removeFromWishList(id)
        .then((data) => console.log(data))
        .catch((err) =>  {
            console.log(err);
            thunkAPI.rejectWithValue(err)
        })
        return response;
    }
)
export const rateAProduct = createAsyncThunk('product/rate-a-product',
    async(data,thunkAPI) => {
        try {
            const response = await productService.rateProduct(data);
            return response;
        }catch(err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const getAllBrands = createAsyncThunk('product/get-all-brands' ,
    async(thunkAPI) => {
        try {
            return await productService.getAllBrands();
        }catch(err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)
export const getAllCategories = createAsyncThunk('product/get-all-categories' ,
    async(thunkAPI) => {
        try {
            return await productService.getAllCategories();
        }catch(err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)
export const getAllTags = createAsyncThunk('product/get-all-tags' ,
    async(thunkAPI) => {
        try {
            return await productService.getAllTags();
        }catch(err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)
const productSlice = createSlice({
    initialState,
    reducers : {},
    name : "product",
    extraReducers : (builder) => {
        builder
        .addCase(getAllProducts.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getAllProducts.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.products = action.payload;
        })
        .addCase(getAllProducts.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getProduct.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getProduct.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.product = action.payload;
        })
        .addCase(getProduct.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(addToWishList.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(addToWishList.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.wishlists = action.payload;
        })
        .addCase(addToWishList.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(removeFromWishList.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(removeFromWishList.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            
        })
        .addCase(removeFromWishList.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(rateAProduct.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(rateAProduct.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = ''
        })
        .addCase(rateAProduct.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAllBrands.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getAllBrands.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = '';
            state.brands = action.payload;
        })
        .addCase(getAllBrands.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAllCategories.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getAllCategories.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = '';
            state.categories = action.payload;
        })
        .addCase(getAllCategories.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getAllTags.pending,(state) => {
            state.isLoading = true;
        })
        .addCase(getAllTags.fulfilled, (state,action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = '';
            state.tags = action.payload;
        })
        .addCase(getAllTags.rejected,(state,action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })

    }
})

export default productSlice.reducer;