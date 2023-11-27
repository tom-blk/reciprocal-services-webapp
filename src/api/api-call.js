import axios from "axios"

export const apiCall = async ( endpoint, METHOD, payload ) => {

    console.log('called with ' + endpoint + ' endpoint');
    
    const parameters = {
        url: `${process.env.REACT_APP_SERVER_LOCATION}${endpoint}`,
        method: METHOD,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        data: payload,
        withCredentials: true
    };

    try{
        const response = await axios(parameters)
        return await response.data
    } catch(error){
        if(error.response === undefined){
            console.log(error)
            throw new Error('Connection Failed.')
        }

        if(error.response.status === 401){
            console.log(error)
            throw new Error('Error 401: User Not Authenticated.')
        }
        if(error.response.status === 403){
            console.log(error)
            throw new Error('Error 403: User Not Authorized.')
        }
        if(error.response.status === 404){
            console.log(error)
            throw new Error('Error 404: Not Found.')
        }
        if(error.response.status === 500){
            console.log(error)
            throw new Error('Error 500: Server Error.')
        }
    }
}