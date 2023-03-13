import axios from 'axios';

export const getOrdersWithSpecificStatusAndDirection = async (userId, orderStatus, orderDirection, onErrorFunction) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/get-orders-with-specific-status-and-direction/${userId}`, {
            orderDirection: orderDirection, 
            status: orderStatus,
            userId: userId,
        })
        return response.data;
    } catch(error){
        onErrorFunction(error);
    }
}

export const getAllOrdersWithSpecificDirection = async (userId, orderDirection, onErrorFunction) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/get-all-orders/${userId}`, {
            orderDirection: orderDirection, 
            userId: userId,
        })
        return response.data;
    } catch(error){
        onErrorFunction(error);
    }
}

export const getSingleOrder = async (orderId, onErrorFunction) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/get-single-order/${orderId}`, {
            orderId: orderId
        })
        return response.data;
    } catch(error){
        onErrorFunction(error);
    }
}