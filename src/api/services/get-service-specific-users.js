import axios from "axios"

export const getServiceSpecificUsers = async (serviceId, onErrrorFunction) => {

    const sortUsersByRating = (users) => {
        return(users.sort((a, b) => {
            if(a.rating < b.rating) return -1;
            if(a.rating > b.rating) return 1;
            return 0;
        }))
    }

    try{
        const response = await axios.post(`http://localhost:5000/services/get-service-specific-users`, {
            serviceId: serviceId
        })

        sortUsersByRating(response.data);

        return response.data;
    }catch(error){
        onErrrorFunction(error)
    }
}