import axios from "axios";

export const nextOrderStage = async (orderId, newOrderStatus, onErrorFunction) => {

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
        return response.data;
    }catch(error){
        onErrorFunction(error);
    }
}

export const denyOrder = async (orderId, onErrorFunction) => {

    try{
        const response = await axios.put(`http://localhost:5000/deny-order/${orderId}`, {
            orderId: orderId,
        })
        return response.data;
    }catch(error){
        onErrorFunction(error);
    }
}