import { uploadFile } from "../../utils/web3storage/web3storage"
import { apiCall } from "../api-call"

export const updateUser = async ( user, onErrorFunction, onSuccessFunction ) => {

    try{
        await apiCall('/users/update-user', 'POST', { userId: user.id, firstName: user.firstName, lastName: user.lastName, description: user.profileDescription })
            .then(onSuccessFunction('Profile SuccessFully Updated!'))

    } catch(error){
        onErrorFunction(error)
    }
}

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
        const response = await apiCall('/users/update-user-services', 'POST', { userId: userId, serviceIdsToBeAdded: serviceIdsToBeAdded, serviceIdsToBeRemoved: serviceIdsToBeRemoved })

        return await response.data;
    }catch(error){
        onErrrorFunction(error)
    }
}

export const uploadNewProfilePictureAndCreateDatabaseEntryWithCid = async ( userId, image, onErrorFunction, onSuccessFunction ) => {

    try{
        const cid = await uploadFile([image], onSuccessFunction, onErrorFunction);
        await apiCall('/users/update-user-profile-picture', 'PUT', { userId: userId, profilePicture: cid })
            .then(onSuccessFunction('Profile Picture SuccessFully Updated!'))
    } catch(error){
        onErrorFunction(error)
    }
}

export const addServiceToUserServices = async (userId, serviceId, onErrrorFunction, onSuccessFunction) => {

    try{
        await apiCall('/users/add-service-to-user-services', 'POST', { userId: userId, serviceId: serviceId })
            .then(onSuccessFunction('Service Successfully Added!'))
        
    }catch(error){
        onErrrorFunction(error);
    }
}

export const removeServiceFromUserServices = async (userId, serviceId, onErrrorFunction, onSuccessFunction) => {

    try{
        const response = await apiCall('/users/remove-service-from-user-services', 'POST', { userId: userId, serviceId: serviceId })
            .then(onSuccessFunction('Service Successfully Removed!'))

    }catch(error){
        onErrrorFunction(error);
    }
}

export const rateUser = async (userId, rating, onSuccessFunction, onErrorFunction) => {
    
    try{
        await apiCall('/users/rate-user', 'POST', { userId: userId, rating: rating })
            .then(onSuccessFunction('Provider Successfully Rated!'))
        
    } catch(error){
        onErrorFunction(error);
    }
}