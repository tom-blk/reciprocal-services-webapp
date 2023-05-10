import axios from "axios"

export const updateUser = async ( user, onErrorFunction, onSuccessFunction ) => {

    try{
        const response = await axios.put(`http://localhost:5000/users/update-user`, {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            description: user.profileDescription
        })
        onSuccessFunction('Profile SuccessFully Updated!')
        return response.data;
    } catch(error){
        onErrorFunction(error)
    }
}