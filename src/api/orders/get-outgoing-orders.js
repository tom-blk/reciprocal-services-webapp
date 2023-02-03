import axios from 'axios';

export const getActionableOutgoingOrders = async (receivingUserId, onErrorFunction) => {
    
    try{
        const response = await axios.post(`http://localhost:5000/get-actionable-outgoing-orders/${receivingUserId}`, {
            receivingUserId: receivingUserId,
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