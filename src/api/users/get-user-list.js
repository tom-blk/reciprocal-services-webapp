import axios from "axios"

export const getUserList = async ( onErrorFunction ) => {

    try{
        const response = await axios.get(`http://localhost:5000/users/get-list`)
        return response.data;
    } catch(error){
        onErrorFunction(error)
    }
}