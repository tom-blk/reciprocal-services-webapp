import { apiCall } from "../api-call";

export const getUser = async () => {
        try{
            const data = await apiCall('/auth/get-user', 'GET');
            return data;
        } catch(error){
            throw new Error(error);
        }
}