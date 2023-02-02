import axios from 'axios';

export const getIncomingOrders = async (providingUserId, onErrorFunction) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/get-incoming-orders/${providingUserId}`, {
            providingUserId: providingUserId,
        })
        return response.data;
    } catch(error){
        onErrorFunction(error);
    }
}

export const getIncomingPendingOrders = async (providingUserId, onErrorFunction) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/get-incoming-pending-orders/${providingUserId}`, {
            providingUserId: providingUserId,
        })
        return response.data;
    } catch(error){
        onErrorFunction(error);
    }
}

export const getIncomingCompletedOrders = async (providingUserId, onErrorFunction) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/get-incoming-completed-orders/${providingUserId}`, {
            providingUserId: providingUserId,
        })
        return response.data;
    } catch(error){
        onErrorFunction(error);
    }
}