import axios from "axios"

export const addServiceToUserServices = async (userId, serviceId, onErrrorFunction, onSuccessFunction) => {

    try{
        const response = await axios.post(`http://localhost:5000/add-service-to-user-services`, {
            userId: userId,
            serviceId: serviceId,
        })
        onSuccessFunction('Service Successfully Added!');
        return response.data;
    }catch(error){
        onErrrorFunction(error);
    }
}