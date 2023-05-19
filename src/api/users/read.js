import { apiCall } from "../api-call";

export const getSingleUser = async ( id, onErrorFunction ) => {

    try{
        const data = await apiCall('/users/get-single-user', 'POST', { userId: id });
        return data;
    } catch(error){
        onErrorFunction(error)
    }
}

export const getUserList = async ( userId, onErrorFunction ) => {

    try{
        const data = await apiCall(`/users/get-list`, 'POST', {userId: userId});
        return await data;
    } catch(error){
        onErrorFunction(error)
    }
}

export const getUserSpecificServices = async (userId, onErrrorFunction) => {

    try{
        const data = await apiCall('/users/get-user-specific-services', 'POST', { userId: userId });
        return data;
    }catch(error){
        onErrrorFunction(error)
    }
}

export const getServiceUserAffiliation = async (userId, serviceId, onErrrorFunction) => {
    try{
        const data = await apiCall('/users/get-service-user-affiliation', 'POST', { userId: userId, serviceId: serviceId })
        return await data;
    }catch(error){
        onErrrorFunction(error);
    }
}