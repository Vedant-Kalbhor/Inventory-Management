import api from '../../api/axiosInstance.js';
import { ENDPOINTS } from '../../api/endpoints';

export async function loginApi(credentials){
    const res= await api.post(ENDPOINTS.AUTH.LOGIN,credentials);
    return res.data;
}

export async function fetchProfile(){
    const res=await api.get(ENDPOINTS.AUTH.PROFILE);
    return res.data;
}