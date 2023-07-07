import { apiCall } from "../api-call";

export const getUser = async () => {
    if(document.cookie.split('=').includes('prometheusUserAuthenticationToken') && document.cookie.split('=')[1]){
        try{
            const data = await apiCall('/auth/get-user', 'POST', {jwt: document.cookie});
            return data;
        } catch(error){
            throw new Error(error);
        }
    }
}