import axios from 'axios';

export const createOrder = async (orderData, onSuccessFunction, onErrorFunction) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/create-order`, {
            serviceId: orderData.serviceId,
            providingUserId: orderData.providingUserId,
            receivingUserId: orderData.receivingUserId,
            dateIssued: new Date(),
        })
        onSuccessFunction('Service successfuly ordered. Check your outgoing orders to see the status of your order.')
        console.log(response);
        
    } catch(error){
        onErrorFunction(error);
    }
}