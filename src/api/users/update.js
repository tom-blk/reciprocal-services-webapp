import { apiCall } from "../api-call"
import axios from "axios";

export const updateUser = async ( user ) => {

    try{
        await apiCall('/users/update-user', 'PUT', { userId: user.id, firstName: user.firstName, lastName: user.lastName, description: user.profileDescription, country: user.country, postCode: user.postCode, city: user.city, travellingForOrders: user.travellingForOrders })
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

export const uploadProfilePicture = async (picture, userId) => {
    //! userOrServiceString is specified as 'user' or 'service' in the componenent that calls the function to specify what kind of upload this is

    console.log('called with /users/upload-service-picture endpoint');

    const pictureForm = new FormData(); //! To be accepted by the Multer library on the server, the image must be multipart/form-data
    pictureForm.append('picture', picture); //! Name on backend and this name need to be the same 
    pictureForm.append('userId', userId);
    
    const parameters = {
        url: `${process.env.REACT_APP_SERVER_LOCATION}/users/upload-profile-picture`,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data", //! Is not strictly necessary to be accepted by Multer, since FormData() already comes with the proper encoding, but still a failsafe in case something gets changed
        },
        data: pictureForm,
        withCredentials: true
    };

    try{
        const response = await axios(parameters)
        return await response.data
    } catch(error){
        console.log(error);
        if(error.response === undefined){
            throw new Error('Connection Failed.')
        }
        if(error.response){
            throw new Error(`Error ${error.response.status}: ${error.response.data}`)
        }
    }
}