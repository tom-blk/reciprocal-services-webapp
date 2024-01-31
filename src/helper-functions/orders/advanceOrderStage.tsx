// Function to advance the order status to the next stage

import { toast } from "react-toastify";
import { modifyOrderStatus } from "../../api/orders/update"

import { Order } from "../../types/orders"
import AlertMessageComponent from "../../components/alerts/alert-message.component";
import { errorMessageOptions } from "../../components/alerts/alertMessageTypes";

export const advanceOrderStage = (order: Order, nextOrderStage: number, onOrderStageModified: () => void) => {

    if(nextOrderStage !== 4){
        modifyOrderStatus(order.id, nextOrderStage)
            .then(
                () => {
                    onOrderStageModified(/*{...tempOrder, status: nextOrderStage}*/);
                }
            )
            .catch(error => toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions))
    }  
}