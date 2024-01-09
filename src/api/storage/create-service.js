import axios from "axios";

export const createService = async (serviceData) => {
    //! userOrServiceString is specified as 'user' or 'service' in the componenent that calls the function to specify what kind of upload this is

    console.log('called with /storage/upload-service-picture endpoint');

    const serviceDataForm = new FormData(); //!Needs to be in that format for Multer to accept the image on the backend
    
    serviceDataForm.append('name', serviceData.name); 
    serviceDataForm.append('description', serviceData.description);
    serviceDataForm.append('userId', serviceData.userId);
    serviceDataForm.append('creditsPerHour', serviceData.creditsPerHour);
    serviceDataForm.append('picture', serviceData.picture); //! Name on backend and this name need to be the same

    const urlSuffix = `/services/create-service`
    
    const parameters = {
        url: `${process.env.REACT_APP_SERVER_LOCATION}${urlSuffix}`,
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
        if(error.response === undefined){
            console.log(error)
            throw new Error('Connection Failed.')
        }

        if(error.response.status === 401){
            console.log(error)
            throw new Error('Error 401: User Not Authenticated.')
        }
        if(error.response.status === 403){
            console.log(error)
            throw new Error('Error 403: User Not Authorized.')
        }
        if(error.response.status === 404){
            console.log(error)
            throw new Error('Error 404: Not Found.')
        }
        if(error.response.status === 500){
            console.log(error)
            throw new Error('Error 500: Internal Server Error.')
        }
    }
}