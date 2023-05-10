import axios from "axios"

export const getServiceProviderCount = async (serviceId, onErrrorFunction) => {

    try{
        const response = await axios.post(`http://localhost:5000/services/get-service-provider-count`, {
            serviceId: serviceId
        })

        return response.data;
    }catch(error){
        onErrrorFunction(error)
    }
}