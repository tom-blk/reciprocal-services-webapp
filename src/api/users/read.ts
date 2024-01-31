import { apiCall } from "../api-call";

export const getSingleUser = async (id: number) => {

    try{
        const data = await apiCall('/users/get-single-user', 'POST', { userId: id });
        return data;
    } catch(error){
        throw new Error('Failed to fetch user...')
    }
}

export const getUserCountry = async (countryId: number) => {

    try{
        const data = await apiCall('/users/get-user-country', 'POST', { countryId: countryId });
        return data;
    } catch(error){
        throw new Error('Failed to fetch user country...')
    }
}

export const getUsersInLocation = async (userId: number, countryId: number, postCode: number) => {

    try{
        console.log(`${userId} ${countryId} ${postCode}`)
        const data = await apiCall(`/users/get-users-in-location`, 'POST', {userId: userId, countryId: countryId, postCode: postCode});
        return await data;
    } catch(error){
        throw new Error('Failed to fetch user list...')
    }
}

export const getUserList = async (userId: number) => {

    try{
        const data = await apiCall(`/users/get-list`, 'POST', {userId: userId});
        return await data;
    } catch(error){
        throw new Error('Failed to fetch user list...')
    }
}

export const getUserSpecificServices = async (userId: number) => {

    try{
        const data = await apiCall('/users/get-user-specific-services', 'POST', { userId: userId });
        return data;
    }catch(error){
        throw new Error('Failed to fetch user services...')
    }
}

export const getServiceUserAffiliation = async (userId: number, serviceId: number) => {
    try{
        const data = await apiCall('/users/get-service-user-affiliation', 'POST', { userId: userId, serviceId: serviceId })
        return await data;
    }catch(error){
        throw new Error(`Failed to determine if service with id ${serviceId} is offered...`)
    }
}