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

export const transferCredits = async (senderId, recipientId) => {

    try{
        await apiCall('/orders/transfer-credits', 'PUT', { senderId: senderId, recipientId: recipientId })
    }catch(error){
        console.log(error)
        throw new Error('Failed to transfer credits...')
    }
}

