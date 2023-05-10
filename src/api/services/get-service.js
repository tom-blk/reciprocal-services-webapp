import axios from "axios"

export const getService = async (serviceId, onErrorFunction) => {
    try{
        const response = await axios.post(`http://localhost:5000/services/get-service/${serviceId}`, {
            serviceId: serviceId
        })
        return response.data;
    } catch(error){
        onErrorFunction(error)
    }
}