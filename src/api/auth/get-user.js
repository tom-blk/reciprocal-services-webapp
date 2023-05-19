import { apiCall } from "../api-call";

export const getUser = async ( onErrorFunction ) => {
    if(document.cookie.split('=').includes('prometheusUserAuthenticationToken') && document.cookie.split('=')[1]){
        try{
            const data = await apiCall('/auth/get-user', 'POST', {jwt: document.cookie});
            return data;
        } catch(error){
            onErrorFunction(error)
        }
    } else{
        return
    }
}