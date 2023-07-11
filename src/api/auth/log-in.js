import axios from 'axios';

export const logIn = async (email, password) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/auth/log-in`, {
            email: email,
            password: password,
        }, {withCredentials: true})
        return response;
    } catch(error){
        throw new Error(error.response.data)
    }
}