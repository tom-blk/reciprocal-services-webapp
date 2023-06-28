// Function to advance the order status to the next stage

import { modifyOrderStatus } from "../../api/orders/update"

export const advanceOrderStage = (order, nextOrderStage, onOrderStageModified, onErrorFunction) => {
    let tempOrder = order;

    if(nextOrderStage != 4){
        modifyOrderStatus(order.id, nextOrderStage)
            .then(onOrderStageModified({...tempOrder, status: nextOrderStage}))
            .catch(error => onErrorFunction(error))
    }  
}