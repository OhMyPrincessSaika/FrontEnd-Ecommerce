import axios from 'axios';


const getAllBanners = async() => {
    //TODO:to change dynamic url
    const allBanners = await axios.get(`http://localhost:5000/banner`);
    return allBanners.data;
}

export const bannerService = { getAllBanners }