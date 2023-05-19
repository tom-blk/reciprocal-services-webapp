import { uploadFile } from "../../utils/web3storage/web3storage";
import { apiCall } from "../api-call";

export const createService = async (serviceData, onSuccessFunction, onErrorFunction) => {
    try{
        if(!serviceData.icon){
            const newServiceId = await apiCall('/services/create-service', 'POST', {name: serviceData.name, description: serviceData.description, icon: undefined});
            return  await newServiceId;
        }else{
            uploadFile([serviceData.icon], onSuccessFunction, onErrorFunction).then( async rootCid => {
                const newServiceId = await await apiCall('/services/create-service', 'POST', {name: serviceData.name, description: serviceData.description, icon: rootCid});
                return await newServiceId;
            })
            return 
        }
    } catch(error){
        onErrorFunction(error)
    }
}