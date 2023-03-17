import axios from "axios"

export const updateUserSpecificServices = async (userId, serviceIds, onErrrorFunction) => {

    try{
        const response = await axios.post(`http://localhost:5000/update-user-specific-services`, {
            userId: userId,
            serviceIds: serviceIds
        })

        return response.data;
    }catch(error){
        onErrrorFunction(error)
    }
}