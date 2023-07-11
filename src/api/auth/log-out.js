import axios from 'axios';

export const logOut = async (email, password) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/auth/log-out`, {}, {withCredentials: true})
        return response;
    } catch(error){
        throw new Error(error.response.data)
    }
}