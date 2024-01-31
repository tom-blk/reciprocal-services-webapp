import { apiCall } from "../api-call";

export const modifyOrderStatus = async (orderId: number, newOrderStatus: number) => {

    try{
        const response = await apiCall('/orders/modify-order-status', 'PUT', { status: newOrderStatus, orderId: orderId })
        return response;
    }catch(error){
        console.log(error)
        throw new Error('Failed to update order...')
    }
}

export const specifyProvidedHours = async (orderId: number, hoursProvided: number) => {

    try{
        const response = await apiCall('/orders/specify-provided-hours', 'PUT', { orderId: orderId, hoursProvided: hoursProvided })
        return response;
    }catch(error){
        console.log(error)
        throw new Error('Failed to update provided hours...')
    }
}

export const confirmOrderCompletionRateUserAndTransferCredits = async (orderId: number, recipientId: number, senderId: number, numberOfCredits: number, rating: number) => {

    try{
        const response = await apiCall('/orders/confirm-order-completion-rate-user-and-transfer-credits', 'PUT', { orderId: orderId, dateCompleted: new Date().toISOString().slice(0, 19).replace('T', ' '), recipientId: recipientId, senderId: senderId, numberOfCredits: numberOfCredits, rating: rating })
        return response;
    }catch(error){
        console.log(error)
        throw new Error('Failed to Complete Order...')
    }
}

