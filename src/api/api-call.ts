import axios from "axios"

export const apiCall = async ( endpoint: string, METHOD: string, payload?: any ) => {
    
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
        if(axios.isAxiosError(error) && !error.response){
            throw new Error('Connection Failed.')
        } else if(axios.isAxiosError(error) && error.response){
            throw new Error(`Error ${error.response.status}: ${error.response.data}`)
        }
    }
}