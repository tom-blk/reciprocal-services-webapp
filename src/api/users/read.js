import { apiCall } from "../api-call";

export const getSingleUser = async (id) => {

    try{
        const data = await apiCall('/users/get-single-user', 'POST', { userId: id });
        return data;
    } catch(error){
        console.log(error.message)
        throw new Error('Failed to fetch user...')
    }
}

export const getUserList = async (userId) => {

    try{
        const data = await apiCall(`/users/get-list`, 'POST', {userId: userId});
        return await data;
    } catch(error){
        console.log(error.message)
        throw new Error('Failed to fetch user list...')
    }
}

export const getUserSpecificServices = async (userId) => {

    try{
        const data = await apiCall('/users/get-user-specific-services', 'POST', { userId: userId });
        return data;
    }catch(error){
        console.log(error.message)
        throw new Error('Failed to fetch user services...')
    }
}

export const getServiceUserAffiliation = async (userId, serviceId) => {
    try{
        const data = await apiCall('/users/get-service-user-affiliation', 'POST', { userId: userId, serviceId: serviceId })
        return await data;
    }catch(error){
        console.log(error.message)
        throw new Error(`Failed to determine if service with id ${serviceId} is offered...`)
    }
}