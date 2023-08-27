import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axios_config';

const getBlogs = async() => {
    try {
        const response = await axios.get(`${base_url}blog`);
        return response.data;
    }catch(err) {
        console.log(err);
    }

}

const getBlog = async(id) => {
    try {
        const response = await axios.get(`${base_url}blog/${id}`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}

const getBlogCategories = async(id) => {
    try {
        const response = await axios.get(`${base_url}/blog-category`);
        return response.data;
    }catch(err) {
        console.log(err);
    }
}
export const blogService = {
    getBlogs,
    getBlog,
    getBlogCategories
}