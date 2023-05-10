import axios from "axios"

export const getUserSpecificServices = async (userId, onErrrorFunction) => {

    const sortServicesAlphabetically = (services) => {
        return(services.sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        }))
    }

    try{
        const response = await axios.post(`http://localhost:5000/users/get-user-specific-services/${userId}`, {
            userId: userId
        })

        sortServicesAlphabetically(response.data);

        return response.data;
    }catch(error){
        onErrrorFunction(error)
    }
}