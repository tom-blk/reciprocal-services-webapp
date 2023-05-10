import axios from "axios"

export const getServiceList = async (onErrorFunction) => {

    const sortServicesAlphabetically = (services) => {
        return(services.sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        }))
    }

    try{
        const response = await axios.get(`http://localhost:5000/services/get-list`)

        sortServicesAlphabetically(response.data)

        return response.data;
    } catch(error){
        onErrorFunction(error)
    }
}