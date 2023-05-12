import axios from "axios"

export const getSingleUser = async ( id, onErrorFunction ) => {

    try{
        const response = await axios.post(`http://localhost:5000/users/get-single-user`, {
            userId: id
        })
        return response.data;
    } catch(error){
        onErrorFunction(error)
    }
}