import { apiCall } from '../api-call';

export const logOut = async () => {
    
    try{
        const response = await apiCall(`/auth/log-out`, 'GET')
        return response;
    } catch(error){
        throw new Error(error.response.data)
    }
}