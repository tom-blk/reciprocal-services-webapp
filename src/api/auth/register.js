import { apiCall } from '../api-call';

export const register = async (username, email, password, onErrorFunction, onSuccessFunction) => {
    
    try{
        const response = await apiCall(`/auth/register`, 'POST', {
            username: username,
            email: email,
            password: password,
        })
        onSuccessFunction('Successfully registered!')
        console.log(response);
    } catch(error){
        onErrorFunction(error);
    }
}