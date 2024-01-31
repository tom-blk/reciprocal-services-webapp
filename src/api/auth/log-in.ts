import { apiCall } from '../api-call';

export const logIn = async (email: string, password: string) => {
    
    try{
        const response = await apiCall(`/auth/log-in`, 'POST', {
            email: email,
            password: password,
        })
        return response;
    } catch(error){
        if(error instanceof Error)
        throw new Error(error.message)
    }
}