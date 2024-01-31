import { apiCall } from '../api-call';

interface OrderData{
    serviceId: number;
    providingUserId: number;
    receivingUserId: number;
    message: string;
    embersPerHour: number;
}

export const createOrder = async (orderData:OrderData) => {  
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