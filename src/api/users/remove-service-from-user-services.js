import axios from "axios"

export const removeServiceFromUserServices = async (userId, serviceId, onErrrorFunction, onSuccessFunction) => {

    try{
        const response = await axios.post(`http://localhost:5000/remove-service-from-user-services`, {
            userId: userId,
            serviceId: serviceId,
        })
        onSuccessFunction('Service Successfully Removed!');
        return response.data;
    }catch(error){
        onErrrorFunction(error);
    }
}