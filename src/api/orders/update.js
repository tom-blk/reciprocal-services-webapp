import { apiCall } from "../api-call";

export const modifyOrderStatus = async (orderId, newOrderStatus, onSuccessFunction, onErrorFunction) => {

    try{
        await apiCall('/orders/modify-order-status', 'POST', { status: newOrderStatus, orderId: orderId })
            .then( data => {
                onSuccessFunction('Confirmed Order Update.');
                return data;
            });
        
    }catch(error){
        onErrorFunction(error);
    }
}

export const denyOrder = async (orderId, onSuccessFunction, onErrorFunction) => {

    try{
        await apiCall('/orders/deny-order', 'POST', { orderId: orderId })
            .then( data => {
                onSuccessFunction('Order denied.');
                return data;
            });

    }catch(error){
        onErrorFunction(error);
    }
}

export const specifyProvidedHours = async (orderId, hoursProvided, onSuccessFunction, onErrorFunction) => {

    try{
        await apiCall('/orders/specify-provided-hours', 'PUT', { orderId: orderId, hoursProvided: hoursProvided })
            .then( data => {
                onSuccessFunction('Hours Specified!');
                return data;
            });

    }catch(error){
        onErrorFunction(error);
    }
}

export const transferCredits = async (senderId, recipientId, onSuccessFunction, onErrorFunction) => {

    try{
        await apiCall('/orders/transfer-credits', 'PUT', { senderId: senderId, recipientId: recipientId })
            .then( data => {
                onSuccessFunction('Credits Successfully Transferred!');
                return data;
            });

    }catch(error){
        onErrorFunction(error);
    }
}

