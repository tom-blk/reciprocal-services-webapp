import axios from "axios";

export const nextOrderStage = async (orderId, newOrderStatus, onSuccessFunction, onErrorFunction) => {

    let url = '';

    switch(newOrderStatus){
        case undefined:
            return;
        case 'confirmed':
            url = 'confirm-order';
            break;
        case 'completed':
            url = 'complete-order';
            break;
        case 'completion-confirmed': 
            url = 'confirm-order-completion'
    }

    try{
        const response = await axios.put(`http://localhost:5000/${url}/${orderId}`, {
            orderId: orderId,
        })
        onSuccessFunction('Confirmed.')
        return response.data;
    }catch(error){
        onErrorFunction(error);
    }
}

export const denyOrder = async (orderId, onSuccessFunction, onErrorFunction) => {

    try{
        const response = await axios.put(`http://localhost:5000/deny-order/${orderId}`, {
            orderId: orderId,
        })
        onSuccessFunction('Order denied.')
        return response.data;
    }catch(error){
        onErrorFunction(error);
    }
}