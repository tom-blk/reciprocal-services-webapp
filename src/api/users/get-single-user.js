import axios from "axios"

export const getFullUser = async ( userId, onErrorFunction ) => {

    try{
        const response = await axios.post(`http://localhost:5000/users/get-full-user-details/${userId}`, {
            userId: userId
        })
        return response.data;
    } catch(error){
        onErrorFunction(error)
    }
}