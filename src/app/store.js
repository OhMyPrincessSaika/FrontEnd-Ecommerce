import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import userReducer from '../features/user/userSlice';
import blogReducer  from '../features/blog/blogSlice';
import enquiryReducer from '../features/contact/contactSlice';
import orderReducer from '../features/order/orderSlice';
import bannerReducer from '../features/banner/bannerSlice';
export const store = configureStore({
    reducer : {
        auth  : authReducer,
        product : productReducer,
        user : userReducer,
        blog : blogReducer,
        enquiry : enquiryReducer,
        order : orderReducer,
        banner : bannerReducer
    }
})