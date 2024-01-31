import { apiCall } from '../api-call';

export const logOut = async () => {
    
    try{
        const response = await apiCall(`/auth/log-out`, 'GET')
        return response;
    } catch(error){
        if(error instanceof Error)
        throw new Error(error.message)
    }
}