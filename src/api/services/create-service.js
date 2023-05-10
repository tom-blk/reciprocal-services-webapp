import axios from "axios"
import { uploadFile } from "../../utils/web3storage/web3storage";

export const createService = async (serviceData, onSuccessFunction, onErrorFunction) => {

    try{
        if(!serviceData.icon){
            const newServiceId = await axios.post(`http://localhost:5000/services/create-service`, {
                name: serviceData.name,
                description: serviceData.description,
                icon: undefined
            })
            return newServiceId.data;
        }else{
            uploadFile([serviceData.icon], onSuccessFunction, onErrorFunction).then( async rootCid => {
                console.log(rootCid);
                const newServiceId = await axios.post(`http://localhost:5000/services/create-service`, {
                    name: serviceData.name,
                    description: serviceData.description,
                    icon: rootCid
                })
                return newServiceId.data;
            })
            return 
        }
    } catch(error){
        onErrorFunction(error)
    }
}