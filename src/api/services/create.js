import { uploadFile } from "../../utils/web3storage/web3storage";
import { apiCall } from "../api-call";

export const createService = async (serviceData, onSuccessFunction, onErrorFunction) => {
    try{
        if(!serviceData.icon){
            const data = await apiCall('/services/create-service', 'POST', {name: serviceData.name, description: serviceData.description, icon: undefined});
            return data;
        }else{
            const rootCid = uploadFile([serviceData.icon], onSuccessFunction, onErrorFunction);
            const data = await apiCall('/services/create-service', 'POST', {name: serviceData.name, description: serviceData.description, icon: rootCid})
            return data;
        }
    } catch(error){
        console.log(error)
        throw new Error('Failed to create service...')
    }
}

export const createServiceAndAddToUserServices = async (serviceData, userId, credtisPerHour, onSuccessFunction, onErrorFunction) => {
    try{
        if(!serviceData.icon){
            const data = await apiCall('/services/create-service-and-add-to-user-services', 'POST', {name: serviceData.name, description: serviceData.description, icon: undefined, userId: userId, creditsPerHour: credtisPerHour});
            return data;
        }else{
            const rootCid = await uploadFile([serviceData.icon], onSuccessFunction, onErrorFunction);
            const data = await apiCall('/services/create-service-and-add-to-user-services', 'POST', {name: serviceData.name, description: serviceData.description, icon: rootCid, userId: userId, creditsPerHour: credtisPerHour});
            return data;
        }
    } catch(error){
        console.log(error)
        throw new Error('Failed to create service and add to services...')
    }
}