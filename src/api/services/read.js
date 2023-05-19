import { apiCall } from "../api-call";

export const getService = async (serviceId, onErrorFunction) => {
    try{   
        const data = await apiCall('/services/get-service', 'POST', { serviceId: serviceId })
        return data;
    } catch(error){
        onErrorFunction(error)
    }
}

export const getServiceList = async (onErrorFunction) => {
    try{
        const data = await apiCall('/services/get-list', 'GET', undefined)
        return await data;
    } catch(error){
        onErrorFunction(error)
    }
}

export const getTrendingServices = async (onErrorFunction) => {
    try{
        const data = await apiCall('/services/get-trending-services', 'GET', undefined);
        return await data;
    } catch(error){
        onErrorFunction(error)
    }
}

export const getServiceProviderCount = async (serviceId, onErrrorFunction) => {
    try{
        const data = await apiCall('/services/get-service-provider-count', 'POST', { serviceId: serviceId })
        return await data;
    }catch(error){
        onErrrorFunction(error)
    }
}

export const getServiceSpecificUsers = async (serviceId, onErrrorFunction) => {
    try{
        const data = await apiCall('/services/get-service-specific-users', 'POST', { serviceId: serviceId })
        return await data;
    }catch(error){
        onErrrorFunction(error)
    }
}