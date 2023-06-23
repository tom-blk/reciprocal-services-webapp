import { modifyOrderStatus } from "../../api/orders/update"

export const setOrderStageToDenied = (order, onOrderStageModified, onErrorFunction) => {

    modifyOrderStatus(order.id, 5)
        .then(onOrderStageModified({...order, status: 5}))
        .catch(error => onErrorFunction(error))
}
