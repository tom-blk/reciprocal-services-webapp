import axios from "axios"

export const getServiceUserAffiliation = async (userId, serviceId, onErrrorFunction) => {

    try{
        const response = await axios.post(`http://localhost:5000/get-service-user-affiliation`, {
            userId: userId,
            serviceId: serviceId,
        })
        return response.data;
    }catch(error){
        onErrrorFunction(error);
    }
}