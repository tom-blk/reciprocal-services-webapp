import { apiCall } from "../api-call";

export const getUser = async () => {

    try{
        const response = await apiCall('/auth/get-user', 'GET');
        return response;
    } catch(error){
        if(error instanceof Error)
        throw new Error(error.message);
    }
}