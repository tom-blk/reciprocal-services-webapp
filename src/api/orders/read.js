import { apiCall } from '../api-call';

export const getOrdersWithSpecificStatusAndDirection = async (userId, orderStatus, orderDirection, onErrorFunction) => {
    
    try{
        const data = await apiCall('/orders/get-orders-with-specific-status-and-direction', 'POST', { orderDirection: orderDirection, status: orderStatus, userId: userId });
        return await data;
    } catch(error){
        onErrorFunction(error);
    }
}

export const getAllOrdersWithSpecificDirection = async (userId, orderDirection, onErrorFunction) => {
    try{
        const data = await apiCall('/orders/get-all-orders', 'POST', { orderDirection: orderDirection, userId: userId });
        return await data;
    } catch(error){
        onErrorFunction(error);
    }
}

export const getSingleOrder = async (orderId, onErrorFunction) => {
    try{
        const data = await apiCall('/orders/get-single-order', 'POST', { orderId: orderId });
        return await data;
    } catch(error){
        onErrorFunction(error);
    }
}