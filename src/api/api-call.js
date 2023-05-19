import axios from "axios"

const baseUrl = 'http://localhost:5000';

export const apiCall = async ( endpoint, METHOD, payload ) => {

    const jwtCookie = await document.cookie;
    
    const parameters = {
        url: `${baseUrl}${endpoint}`,
        method: METHOD,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
            'Authorization': jwtCookie 
        },
        data: payload
    };

    try{
        const response = await axios(parameters)
        return await response.data
    } catch(error){
        return(error)
    }
}