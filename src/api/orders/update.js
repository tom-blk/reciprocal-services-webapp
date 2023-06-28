import { apiCall } from "../api-call";

export const modifyOrderStatus = async (orderId, newOrderStatus) => {

    try{
        await apiCall('/orders/modify-order-status', 'PUT', { status: newOrderStatus, orderId: orderId })
    }catch(error){
        console.log(error)
        throw new Error('Failed to update order...')
    }
}

export const denyOrder = async (orderId) => {

    try{
        await apiCall('/orders/deny-order', 'POST', { orderId: orderId })
    }catch(error){
        console.log(error)
        throw new Error('Failed to deny order...')
    }
}

export const specifyProvidedHours = async (orderId, hoursProvided) => {

    try{
        await apiCall('/orders/specify-provided-hours', 'PUT', { orderId: orderId, hoursProvided: hoursProvided })
    }catch(error){
        console.log(error)
        throw new Error('Failed to update provided hours...')
    }
}

export const confirmOrderCompletionRateUserAndTransferCredits = async (orderId, recipientId, senderId, numberOfCredits, rating) => {

    try{
        await apiCall('/orders/confirm-order-completion-rate-user-and-transfer-credits', 'PUT', { orderId: orderId, dateCompleted: new Date().toISOString().slice(0, 19).replace('T', ' '), recipientId: recipientId, senderId: senderId, numberOfCredits: numberOfCredits, rating: rating })
    }catch(error){
        console.log(error)
        throw new Error('Failed to Complete Order...')
    }
}

