import axios from 'axios';
import {base_url} from '../../utils/base_url';

const register = async(data) => {
    console.log(data);
    try {
        const response = await axios.post(`${base_url}register`,data);
        if(response.data) {
            console.log(response.data)
            localStorage.setItem('customer',JSON.stringify(response.data));
            return response.data;
        }
    }catch(err) {
        console.log(err);
        throw new Error(err.response.data);
    }
}
const login = async(data) => {
    try {
        //TODO:change dynamic url
        const response = await axios.post(`${base_url}/login`,data);
        if(response.data) {
            localStorage.setItem('customer',JSON.stringify(response.data));
        }
        return response.data;
    }catch(err) {
        console.log(err);
        throw new Error(err.response.data);
    }
}



export const authService = {
    register,
    login,
}