import { apiCall } from "../api-call";

export const getService = async (serviceId) => {
    try{   
        const data = await apiCall('/services/get-service', 'POST', { serviceId: serviceId })
        return data;
    } catch(error){
        throw new Error('Failed to fetch the service...')
    }
}

export const getAverageCreditsPerHour = async (serviceId, country, postCode) => {
    try{   
        const data = await apiCall('/services/get-average-credits-per-hour', 'POST', { serviceId: serviceId, country: country, postCode: postCode })
        return data;
    } catch(error){
        throw new Error('Failed to fetch the average credits per hour...')
    }
}

export const getServiceList = async () => {
    try{
        const data = await apiCall('/services/get-list', 'GET', undefined)
        return await data;
    } catch(error){
        console.log(error.message)
        throw new Error('Failed to fetch the list of services...')
    }
}

export const getTrendingServices = async () => {
    try{
        const data = await apiCall('/services/get-trending-services', 'GET', undefined);
        return await data;
    } catch(error){
        throw new Error('Failed to fetch the list of trending services...')
    }
}

export const getServiceProviderCount = async (serviceId) => {
    try{
        const data = await apiCall('/services/get-service-provider-count', 'POST', { serviceId: serviceId })
        return await data;
    }catch(error){
        throw new Error(`Failed to get number of providers for serviceId ${serviceId}`)
    }
}

export const getLocalServiceProviderCount = async (serviceId, userCountry, userPostCode) => {
    try{
        const data = await apiCall('/services/get-local-service-provider-count', 'POST', { serviceId: serviceId, country: userCountry, postCode: userPostCode })
        return await data;
    }catch(error){
        throw new Error(`Failed to get number of local providers for serviceId ${serviceId}`)
    }
}

export const getServiceSpecificUsers = async (serviceId) => {
    try{
        const data = await apiCall('/services/get-service-specific-users', 'POST', { serviceId: serviceId })
        return await data;
    }catch(error){
        throw new Error(`Failed to get list of providers for serviceId ${serviceId}`)
    }
}

export const getLocalServiceSpecificUsers = async (serviceId, country, postCode) => {
    try{
        const data = await apiCall('/services/get-local-service-specific-users', 'POST', { serviceId: serviceId, country: country, postCode: postCode })
        return await data;
    }catch(error){
        throw new Error(`Failed to get list of providers for serviceId ${serviceId}`)
    }
}