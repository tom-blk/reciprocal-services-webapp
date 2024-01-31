import { apiCall } from '../api-call';

export const register = async (username: string, email: string, password: string) => {
    
    try{
        const response = await apiCall(`/auth/register`, 'POST', {
            username: username,
            email: email,
            password: password,
        })
        return response;
    } catch(error){
        if(error instanceof Error)
        throw new Error(error.message)
    }
}