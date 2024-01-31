import axios from "axios";
import { ServiceData } from '../../types/services'

export const createService = async (serviceData: ServiceData) => {
    //! userOrServiceString is specified as 'user' or 'service' in the componenent that calls the function to specify what kind of upload this is

    console.log('called with /services/upload-service-picture endpoint');

    const serviceDataForm = new FormData(); //!Needs to be in that format for Multer to accept the image on the backend
    
    serviceDataForm.append('name', serviceData.name); 
    serviceDataForm.append('description', serviceData.description);
    if(serviceData.userId)
    serviceDataForm.append('userId', serviceData.userId?.toString());
    if(serviceData.creditsPerHour)
    serviceDataForm.append('creditsPerHour', serviceData.creditsPerHour.toString());
    if(serviceData.picture)
    serviceDataForm.append('picture', serviceData.picture); //! Name on backend and this name need to be the same
    
    const parameters = {
        url: `${process.env.REACT_APP_SERVER_LOCATION}/services/create-service`,
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data", //! Is apparently strictly necessary to be accepted by Multer, even though FormData() should already come with the proper encoding
        },
        data: serviceDataForm,
        withCredentials: true
    };

    try{
        const response = await axios(parameters)
        return await response.data
    } catch(error){
        console.log(error);
        if(axios.isAxiosError(error) &&!error.response){
            throw new Error('Connection Failed.')
        } else if(axios.isAxiosError(error) && error.response){
            throw new Error(`Error ${error.response.status}: ${error.response.data}`)
        }else{
            console.error(error)
        }
    }
}