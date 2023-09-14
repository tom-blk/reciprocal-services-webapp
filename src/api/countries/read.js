import { apiCall } from '../api-call';

export const getAllCountries = async () => {
    
    try{
        const data = await apiCall('/countries/get-all-countries', 'GET');
        return await data;
    } catch(error){
        throw new Error(`Failed to fetch list of countries...`)
    }
}