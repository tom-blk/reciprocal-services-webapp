import axios from 'axios';

export const logOut = async (email, password) => {
    
    try{
        const response = await axios.post(`http://141.147.52.47/auth/log-out`, {}, {withCredentials: true})
        return response;
    } catch(error){
        throw new Error(error.response.data)
    }
}