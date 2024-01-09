import { apiCall } from "../api-call";

export const createService = async (serviceData) => {
    try{

        const serviceDataForm = new FormData(); //!Needs to be in that format for Multer to accept the image on the backend
        serviceDataForm.append('picture', serviceData.picture); //! Name on backend and this name need to be the same
        serviceDataForm.append('name', serviceData.name); 
        serviceDataForm.append('description', serviceData.description);
        serviceDataForm.append('userId', serviceData.userId);
        serviceDataForm.append('creditsPerHour', serviceData.creditsPerHour);

        const data = await apiCall('/services/create-service', 'POST', {serviceDataForm: serviceDataForm})
        return data;
    } catch(error){
        console.log(error)
        throw new Error('Failed to create service...')
    }
}

export const createServiceAndAddToUserServices = async (serviceData, userId, credtisPerHour) => {
    try{
        console.log(serviceData);
        const data = await apiCall('/services/create-service-and-add-to-user-services', 'POST', {name: serviceData.name, description: serviceData.description, userId: userId, creditsPerHour: credtisPerHour});
        return data;
    } catch(error){
        console.log(error)
        throw new Error('Failed to create service and add to services...')
    }
}