import { uploadFile } from "../../utils/web3storage/web3storage";
import axios from "axios"

export const uploadNewProfilePictureAndCreateDatabaseEntryWithCid = async ( userId, image, onErrorFunction, onSuccessFunction ) => {

    try{
        const cid = await uploadFile([image], onSuccessFunction, onErrorFunction);
        const response = await axios.put(`http://localhost:5000/users/update-user-profile-picture`, {
            userId: userId,
            profilePicture: cid
        })
        return response.data;
    } catch(error){
        onErrorFunction(error)
    } finally{
        onSuccessFunction('Profile Picture SuccessFully Updated!')
    }
}