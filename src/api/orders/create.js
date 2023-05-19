import { apiCall } from '../api-call';

export const createOrder = async (orderData, onSuccessFunction, onErrorFunction) => {  
    try{
        const response = await apiCall('/orders/create-order', 'POST', {
            serviceId: orderData.serviceId,
            providingUserId: orderData.providingUserId,
            receivingUserId: orderData.receivingUserId,
            message: orderData.message,
            dateIssued: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }).then(response => {
            onSuccessFunction('Service successfuly ordered. Check your outgoing orders to see the status of your order.');
            console.log(response);
        })
    } catch(error){
        onErrorFunction(error);
    }
}