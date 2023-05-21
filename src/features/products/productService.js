import axios from 'axios';
import { base_url } from '../../utils/base_url';
import {config} from '../../utils/axios_config'

const getAllProducts = async(data) => {
    console.log(data);
    try {
        const response = await axios.get(`${base_url}/product?brand=${data?.brand ? data?.brand : ''}&&category=${data?.category ? data?.category : ''}&&tag=${data?.tag ? data?.tag : ''}&&sort=${data?.sort ? data?.sort : ''}&&numericFields=${data?.minPrice!=0  && data?.minPrice ? 'price>='+data?.minPrice : ''},${data?.maxPrice!=0 && data?.maxPrice ? 'price<='+data?.maxPrice : ''}`);
        return response.data;
    }catch(err) {
        console.log(err);
        throw new Error(err.response.data)
    }
}

const getProduct = async(id) =>  {
    try {
        const response = await axios.get(`${base_url}product/${id}`);
        return response.data;
    }catch(err) {
        console.log(err);
        throw new Error(err.response.data);
    }
}
const addToWishList = async(id) => {
    try{
        const response = await axios.post(`${base_url}product/wishlist/products/${id}`,null,config);
        return response;     
    }catch(err) {
        console.log(err);
    }
} 
const removeFromWishList = async(id) => {
    const response =await axios.patch(`${base_url}product/wishlist/remove/${id}`,null,config);
    return response;
}

const rateProduct = async (data) => {
    const {comment,star,id} = data;
    try {
        const response = await axios.post(`${base_url}/product/rating/${id}`,{comment,star},config);
    return response.data;
    }catch(err) {
        console.log(err);
    }
}

const getAllBrands = async() => {
    try {
        
        const response = await axios.get(`${base_url}/brand`);
        return response.data;
    }catch(err) {   
        console.log(err);
    }
}
const getAllCategories = async() => {
    try {

        const response = await axios.get(`${base_url}/category`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const getAllTags = async () => {
    try {
        const response = await axios.get(`${base_url}/product/tags/get-all-tags`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
export const productService = {
    getAllProducts,
    getProduct,
    removeFromWishList,
    addToWishList,
    rateProduct,
    getAllBrands,
    getAllTags,
    getAllCategories
}