import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axios_config';
const getUserWishList = async() => {
   
    try {
        const response = await axios.get(`${base_url}user/wishlist`,config);
        return response.data;
    }catch(err) {
        console.log(err);
        throw new Error('Rejected');
    }
    
}

const addToCart = async(cartData) => {
    //TODO: change url
    try {
        const response = await axios.post(`http://localhost:5000/product/cart/add-to-cart`,cartData,config);
      
        return response.data;
    }catch(err) {
        console.log(err)
        throw new Error('Rejected')
    }
}

const getUserCart = async() => {
    //TODO: change url
    try {
        const response = await axios.get(`http://localhost:5000/product/cart/products`,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const removeFromCart = async(id) => {
    try {
        const response = await axios.delete(`${base_url}/product/cart/remove-from-cart/${id}`, config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const emptyCart = async() => {
    try {
        const response = await axios.delete(`${base_url}/product/cart/empty-cart`,config );
        return response.data;
    }catch(err) {
        console.log(err);
    }
}


const updateUserCart = async(props) => {
    //TODO : to change url
    const {cartData,id} = props;
    try {
        const response = await axios.patch(`http://localhost:5000/product/cart/update-cart/${id}`,cartData,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const updateUser = async(data) => {
    try {
        const response = await axios.patch(`${base_url}/user/update-user`,data,config)
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
const getUser = async() => {
    try {
        const response = await axios.get(`${base_url}/user/get-user`,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const forgotPasswordToken = async(email) => {
    try {
        const response = await axios.post(`${base_url}/user/password/forgotpassword`,email,config)
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const resetPassword = async(data) => {
    const {password,token} = data;
    try {
        const response = await axios.post(`${base_url}/user/password/reset-password/${token}`,{password},config)
        return response.data;
    }catch(err) {   
        console.log(err);
        throw new Error(err.response.data);
    }
}
export const userService = {
    getUserWishList,
    addToCart,
    getUserCart,
    removeFromCart,
    emptyCart,
    updateUserCart,
    updateUser,
    getUser,
    forgotPasswordToken,
    resetPassword
}