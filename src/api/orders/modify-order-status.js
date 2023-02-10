import axios from "axios";

export const modifyOrderStatus = async (orderId, newOrderStatus, onSuccessFunction, onErrorFunction) => {

    try{
        const response = await axios.put(`http://localhost:5000/modify-order-status/${orderId}`, {
            status: newOrderStatus,
            orderId: orderId,
        })
        onSuccessFunction('Confirmed Order Update.')
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