import { apiCall } from '../api-call';

export const getOrdersWithSpecificStatusAndDirection = async (userId, orderStatus, orderDirection) => {
    
    try{
        const data = await apiCall('/orders/get-orders-with-specific-status-and-direction', 'POST', { orderDirection: orderDirection, status: orderStatus, userId: userId });
        return await data;
    } catch(error){
        throw new Error(`Failed to fetch the ${orderDirection} orders with the status ${orderStatus}...`)
    }
}

export const getAllOrdersWithSpecificDirection = async (userId, orderDirection) => {
    try{
        const data = await apiCall('/orders/get-all-orders', 'POST', { orderDirection: orderDirection, userId: userId });
        return await data;
    } catch(error){
        throw new Error(`Failed to fetch the ${orderDirection} orders...`)
    }
}

export const getSingleOrder = async (orderId) => {
    try{
        const data = await apiCall('/orders/get-single-order', 'POST', { orderId: orderId });
        return await data;
    } catch(error){
        throw new Error(`Failed to fetch order ${orderId}...`)
    }
}