import axios from "axios";

export const uploadUserOrServicePicture = async (picture, userOrServiceId, userOrServiceString) => {
    //! userOrServiceString is specified as 'user' or 'service' in the componenent that calls the function to specify what kind of upload this is

    console.log('called with /storage/upload-service-picture endpoint');

    const pictureForm = new FormData(); //! To be accepted by the Multer library on the server, the image must be multipart/form-data
    pictureForm.append('picture', picture); //! Name on backend and this name need to be the same 
    pictureForm.append(`${userOrServiceString}Id`, userOrServiceId);

    const urlSuffix = `/storage/upload-${userOrServiceString}-picture`
    
    const parameters = {
        url: `${process.env.REACT_APP_SERVER_LOCATION}${urlSuffix}`,
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