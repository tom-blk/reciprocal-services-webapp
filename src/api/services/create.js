import axios from "axios";

export const createService = async (serviceData) => {
    //! userOrServiceString is specified as 'user' or 'service' in the componenent that calls the function to specify what kind of upload this is

    console.log('called with /services/upload-service-picture endpoint');

    const serviceDataForm = new FormData(); //!Needs to be in that format for Multer to accept the image on the backend
    
    serviceDataForm.append('name', serviceData.name); 
    serviceDataForm.append('description', serviceData.description);
    serviceDataForm.append('userId', serviceData.userId);
    serviceDataForm.append('creditsPerHour', serviceData.creditsPerHour);
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
        if(error.response === undefined){
            throw new Error('Connection Failed.')
        }
        if(error.response){
            throw new Error(`Error ${error.response.status}: ${error.response.data}`)
        }
    }
}