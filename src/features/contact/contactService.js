import axios from 'axios';
import {base_url} from '../../utils/base_url';
import {config} from '../../utils/axios_config';

const createEnquiry = (data) => {
  
       return axios.post(`${base_url}enquiry`,data,config);
  
   
}

export const contactService = {
     createEnquiry
}