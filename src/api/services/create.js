import { uploadFile } from "../../utils/web3storage/web3storage";
import { apiCall } from "../api-call";

export const createService = async (serviceData, onSuccessFunction, onErrorFunction) => {
    try{
        if(!serviceData.icon){
            await apiCall('/services/create-service', 'POST', {name: serviceData.name, description: serviceData.description, icon: undefined});
        }else{
            uploadFile([serviceData.icon], onSuccessFunction, onErrorFunction)
                .then( async rootCid => await apiCall('/services/create-service', 'POST', {name: serviceData.name, description: serviceData.description, icon: rootCid}))
                .catch(error => {throw new Error('Failed to upload service icon, aborted service creation...')})
            return 
        }
    } catch(error){
        console.log(error)
        throw new Error('Failed to create service...')
    }
}