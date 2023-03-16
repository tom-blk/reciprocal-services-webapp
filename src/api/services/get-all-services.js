import axios from "axios"

export const getSuperficialServiceDetails = async (onErrorFunction) => {
    try{
        const response = await axios.get(`http://localhost:5000/get-superficial-service-details`)
        return response.data;
    } catch(error){
        onErrorFunction(error)
    }
}