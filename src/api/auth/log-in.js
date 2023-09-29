import axios from 'axios';

export const logIn = async (email, password) => {
    
    try{
        const response = await axios.post(`http://141.147.52.47/auth/log-in`, {
            email: email,
            password: password,
        }, {withCredentials: true})
        return response;
    } catch(error){
        throw new Error(error.response.data)
    }
}