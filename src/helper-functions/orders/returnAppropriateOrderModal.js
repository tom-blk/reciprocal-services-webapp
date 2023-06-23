// Decides which modal to show based on the current stage, depending on whether order-card is shown to the provider or the recipient, there might not be a next stage, so this function might do nothing (inactivc button)

import ConfirmOrCancelModal from "../../components/modals/confirmOrCancel/confirm-or-cancel-modal.component";
import SetHoursWorkedModal from "../../components/modals/setHoursWorked/set-hours-worked-modal.component";
import ConfirmOrderCompletionModalComponent from "../../components/modals/confirmOrderCompletion/confirm-order-completion-modal.component";

import { advanceOrderStage } from "./advanceOrderStage";

export const returnAppropriateOrderModal = (order, nextOrderStage, onOrderStageModified, onErrorFunction) => {

    const onModalConfirm = () => {
        advanceOrderStage(order, nextOrderStage, onOrderStageModified, onErrorFunction)
    }
    
    if(nextOrderStage === 2){
        return(
            <ConfirmOrCancelModal
                prompt={'Do You Really Want to Proceed with this Order?'}
                onConfirm={onModalConfirm}         
            />
        )
    } else if(nextOrderStage === 3){
        return(
            <SetHoursWorkedModal 
                orderId={order.id} 
                confirmedCompletionCallback={onModalConfirm}
            />
        )
    } else if(nextOrderStage === 4){
        return(
            <ConfirmOrderCompletionModalComponent 
                providerId={order.providingUserId} 
                confirmedCompletionCallback={onModalConfirm}
            />
        )
    }
}