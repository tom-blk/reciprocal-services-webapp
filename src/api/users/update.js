import { uploadFile } from "../../utils/web3storage/web3storage"
import { apiCall } from "../api-call"

export const updateUser = async ( user ) => {

    try{
        await apiCall('/users/update-user', 'PUT', { userId: user.id, firstName: user.firstName, lastName: user.lastName, description: user.profileDescription, location: user.location, travelRadius: user.travelRadius })
    } catch(error){
        console.log(error)
        throw new Error('Failed to update user...')
    }
}

export const updateUserSpecificServices = async (userId, servicesToBeChanged) => {

    try{
        await apiCall('/users/update-user-services', 'POST', { userId: userId, servicesToBeChanged: servicesToBeChanged })
    }catch(error){
        console.log(error)
        throw new Error('Failed to update user services...')
    }
}

export const uploadNewProfilePictureAndCreateDatabaseEntryWithCid = async ( userId, image ) => {

    try{
        const cid = await uploadFile([image])
        apiCall('/users/update-profile-picture', 'PUT', { userId: userId, profilePicture: cid })
    } catch(error){
        console.log(error)
        throw new Error('Failed to upload new profile picture...')
    }
}

export const addServiceToUserServices = async (userId, serviceId, embersPerHour) => {
    if(!embersPerHour || embersPerHour === 0 || isNaN(embersPerHour)){
        throw new Error('Please provide a valid amount of embers per hour!')
    }

    try{
        await apiCall('/users/add-service-to-user-services', 'POST', { userId: userId, serviceId: serviceId, creditsPerHour: embersPerHour })
    }catch(error){
        console.log(error)
        throw new Error('Failed to add service to user services...')
    }
}

export const removeServiceFromUserServices = async (userId, serviceId) => {

    try{
        await apiCall('/users/remove-service-from-user-services', 'POST', { userId: userId, serviceId: serviceId })
    }catch(error){
        console.log(error)
        throw new Error('Failed to remove service from user services...')
    }
}

export const rateUser = async (userId, rating) => {
    
    try{
        await apiCall('/users/rate-user', 'POST', { userId: userId, rating: rating })
    } catch(error){
        console.log(error)
        throw new Error('Failed to rate user...')
    }
}