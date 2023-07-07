import { apiCall } from '../api-call';

export const createOrder = async (orderData) => {  
    try{
        const data = await apiCall('/orders/create-order', 'POST', {
            serviceId: orderData.serviceId,
            providingUserId: orderData.providingUserId,
            receivingUserId: orderData.receivingUserId,
            message: orderData.message,
            dateIssued: new Date().toISOString().slice(0, 19).replace('T', ' '),
            creditsPerHour: orderData.embersPerHour
        })

        return data;
    } catch(error){
        console.log(error)
        throw new Error('Failed to create order...')
    }
}