import axios from "axios"

export const getFullService = async (serviceId, onErrorFunction) => {
    try{
        const response = await axios.post(`http://localhost:5000/get-full-service-details/${serviceId}`, {
            serviceId: serviceId
        })
        return response.data;
    } catch(error){
        onErrorFunction(error)
    }
}