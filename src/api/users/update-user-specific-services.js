import axios from "axios"

export const updateUserSpecificServices = async (userId, userServiceIds, selectedServiceIds, onErrrorFunction) => {

    let serviceIdsToBeAdded = [];
    let serviceIdsToBeRemoved = [];

    userServiceIds.forEach(serviceId => {
        if(!selectedServiceIds.includes(serviceId)){
            serviceIdsToBeRemoved.push(serviceId)
        }
    })

    selectedServiceIds.forEach(serviceId => {
        if(!userServiceIds.includes(serviceId)){
            serviceIdsToBeAdded.push(serviceId)
        }
    })

    try{
        const response = await axios.post(`http://localhost:5000/users/update-user-specific-services`, {
            userId: userId,
            serviceIdsToBeAdded: serviceIdsToBeAdded,
            serviceIdsToBeRemoved: serviceIdsToBeRemoved,
        })

        return response.data;
    }catch(error){
        onErrrorFunction(error)
    }
}