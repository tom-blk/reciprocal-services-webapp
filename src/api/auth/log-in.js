import { apiCall } from '../api-call';

export const logIn = async (email, password) => {
    
    try{
        const data = await apiCall(`/auth/log-in`, 'POST', {
            email: email,
            password: password,
        })
        return data;
    } catch(error){
        throw new Error(error)
    }
}