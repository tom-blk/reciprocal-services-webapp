// Decides which modal to show based on the current stage, depending on whether order-card is shown to the provider or the recipient, there might not be a next stage, so this function might do nothing (inactive button)
import { Order } from "../../types/orders";

import ConfirmOrCancelModal from "../../components/modals/confirmOrCancel/confirm-or-cancel-modal.component";
import SetHoursWorkedModal from "../../components/modals/setHoursWorked/set-hours-worked-modal.component";
import ConfirmOrderCompletionModalComponent from "../../components/modals/confirmOrderCompletion/confirm-order-completion-modal.component";

import { advanceOrderStage } from "./advanceOrderStage";

export const returnAppropriateOrderModal = (userId: number, order: Order, nextOrderStage: number, onOrderStageModified: () => void, refetchOrdersAfterUpdating: (direction: 'incoming' | 'outgoing') => void) => {

    const refetchProperDirection = () => {
        if((order.providingUserId === userId) && nextOrderStage === (2 | 3 | 4)){
            refetchOrdersAfterUpdating('incoming')
        }else{
            refetchOrdersAfterUpdating('outgoing')
        }
    }

    const onModalConfirm = () => {
        advanceOrderStage(order, nextOrderStage, onOrderStageModified, refetchProperDirection);
        
    }

    if(nextOrderStage === 2){
        return(
            <ConfirmOrCancelModal
                prompt={'Do You Really Want to Proceed with this Order?'}
                onConfirm={onModalConfirm}         
            />
        );
    } else if(nextOrderStage === 3){
        return(
            <SetHoursWorkedModal 
                orderId={order.id} 
                confirmedCompletionCallback={onModalConfirm}
            />
        );
    } else if(nextOrderStage === 4){
        return(
            <ConfirmOrderCompletionModalComponent 
                providerId={order.providingUserId} 
                order={order}
                confirmedCompletionCallback={onOrderStageModified}
            />
        );
    }

}