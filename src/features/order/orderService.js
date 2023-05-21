import axios from 'axios';
import { config } from '../../utils/axios_config';
import { base_url } from '../../utils/base_url';

const createOrder = async(data) => {
    try {
        const response = await axios.post(`${base_url}/order`,data,config)
        return response.data;
    }catch(err) {
        console.log(err);
    }

} 

const getMyOrder = async(data) => {
    try {
        const response = await axios.get(`${base_url}/order/my/orders`,config);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
export const orderService = {
    createOrder,
    getMyOrder
}