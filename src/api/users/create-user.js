import axios from "axios"

export const createUser = async ( userId, onErrorFunction ) => {

    try{
        const response = await axios.post(`http://localhost:5000/users/create`)
        return response.data;
    } catch(error){
        onErrorFunction(error)
    }
}