// Function to advance the order status to the next stage

import { modifyOrderStatus } from "../../api/orders/update"
import { transferCredits } from "../../api/orders/update";

export const advanceOrderStage = (order, nextOrderStage, onOrderStageModified, onErrorFunction) => {
    let tempOrder = order;

    if(nextOrderStage != 4){
        modifyOrderStatus(order.id, nextOrderStage)
            .then(onOrderStageModified({...tempOrder, status: nextOrderStage}))
            .catch(error => onErrorFunction(error))
    } else {
        transferCredits(tempOrder.receivingUserId, tempOrder.providingUserId)
            .then(modifyOrderStatus(order.id, nextOrderStage)
                .then(onOrderStageModified({...tempOrder, status: nextOrderStage})))
                .catch(error => onErrorFunction(error))
            .catch(error => onErrorFunction(error))
    }   
}

// Go over order context, filter for order Id, remove it from one array, then move it to other array