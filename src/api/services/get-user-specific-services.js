import axios from "axios"

export const getUserSpecificServices = async (userId, onErrrorFunction) => {

    try{
        const response = await axios.post(`http://localhost:5000/get-user-specific-services/${userId}`, {
            userId: userId
        })
        return response.data;
    }catch(error){
        onErrrorFunction(error)
    }
}