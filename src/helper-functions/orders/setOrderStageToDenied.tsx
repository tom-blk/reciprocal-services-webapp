import { toast } from "react-toastify";
import { modifyOrderStatus } from "../../api/orders/update"
import { Order } from "../../types/orders";
import AlertMessageComponent from "../../components/alerts/alert-message.component";
import { errorMessageOptions } from "../../components/alerts/alertMessageTypes";

export const setOrderStageToDenied = (order: Order, onOrderStageModified: () => void) => {

    modifyOrderStatus(order.id, 5)
        .then(() => onOrderStageModified())
        .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
}
