import axios from "axios"

export const getUser = async ( jwt, onErrorFunction ) => {

    try{
        const response = await axios.post(`http://localhost:5000/auth/get-user`, {
            jwt: jwt
        })
        return response.data;
    } catch(error){
        onErrorFunction(error)
    }
}