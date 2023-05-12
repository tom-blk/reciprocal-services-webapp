import axios from "axios"

const jwt = document.cookie.split('=')[1];

const baseUrl = 'http://localhost:5000';

export const apiCall = async ( endpoint, METHOD, payload, onErrorFunction, onSuccessFunction ) => {
    
    const parameters = {
        url: `${baseUrl}${endpoint}`,
        method: METHOD,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
            jwt: jwt,
            payload: payload
        }
    };

    try{
        const response = await axios(parameters)

        if(onSuccessFunction)
        onSuccessFunction('Success!')

        return response.data;

    } catch(error){
        onErrorFunction(error)
    }
}