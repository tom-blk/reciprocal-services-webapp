import axios from "axios"

export const getTrendingServices = async (onErrorFunction) => {
    try{
        const response = await axios.get(`http://localhost:5000/get-trending-services`, {
        })
        return response.data;
    } catch(error){
        onErrorFunction(error)
    }
}