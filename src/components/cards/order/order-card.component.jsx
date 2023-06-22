import { useContext, useEffect, useState } from "react";

import { ModalContext } from "../../../context/modal.context";
import { AlertMessageContext } from "../../../context/alert-message.context";
import { UserContext } from "../../../context/user.context";

import useOrderStatus from "../../../hooks/useOrderStatus";

import CardComponent from "../card.component"
import ButtonComponent from "../../buttons/button/button.component";
import ConfirmOrderCompletionModalComponent from "../../modals/confirmOrderCompletion/confirm-order-completion-modal.component";
import ConfirmOrCancelModal from "../../modals/confirmOrCancel/confirm-or-cancel-modal.component";
import SetHoursWorkedModal from "../../modals/setHoursWorked/set-hours-worked-modal.component";

import { modifyOrderStatus, transferCredits } from "../../../api/orders/update";
import { getService } from "../../../api/services/read";
import { getSingleUser } from "../../../api/users/read";

import { useNavigate } from "react-router";

const OrderCard = ({order}) => {

    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    const { user } = useContext(UserContext);
    const { toggleModal } = useContext(ModalContext);

    const [service, setService] = useState(undefined);
    const [provider, setProvider] = useState(undefined);
    const [tempOrder, setTempOrder] = useState(order); //MIMICS THE CHANGES IN THE DATABASE SO THAT CHANGES BECOME APPARENT WITHOUT HAVING TO REFETCH THE DATA

    const navigate = useNavigate()
    const orderStatusHook = useOrderStatus(tempOrder, user.id);

    useEffect(() => {
        getService(order.serviceId, displayError)
            .then(response => setService(response))
            .catch(error => displayError(error))
        getSingleUser(order.providingUserId, displayError)
            .then(response => setProvider(response))
            .catch(error => displayError(error))
    }, [])
    
    const cardOnClickHandler = () => {
        navigate(`/outgoing-orders/${order.id}`)
    }

    const advanceOrderStageInModal = (e) => {
        if(orderStatusHook.nextStage = !4){
            modifyOrderStatus(order.id, orderStatusHook.nextStage)
                .then(setTempOrder({...tempOrder, status: tempOrder.status + 1}))
                .catch(error => displayError(error))
        } else {
            transferCredits(user.id, order.providingUserId)
                .then(modifyOrderStatus(order.id, orderStatusHook.nextStage)
                    .then(setTempOrder({...tempOrder, status: tempOrder.status + 1})))
                    .catch(error => displayError(error))
                .then(error => displayError(error))
        }   
    }

    const denyOrderInModal = () => {
        modifyOrderStatus(order.id, 5)
            .then(setTempOrder({...tempOrder, status: 5}))
            .catch(error => displayError(error))
    }

    const buttonOnClickHandler = (e) => {
        e.stopPropagation();
        if(orderStatusHook.nextStage && orderStatusHook.nextStage != 4 && orderStatusHook.nextStage != 3){
            toggleModal(
                <ConfirmOrCancelModal
                    prompt={'Do You Really Want to Proceed with this Order?'}
                    onConfirm={advanceOrderStageInModal}         
                />
            )
        } else if(orderStatusHook.nextStage === 3){
            toggleModal(
                <SetHoursWorkedModal 
                    orderId={order.id} 
                    confirmedCompletionCallback={advanceOrderStageInModal}
                />
            )
        } else if(orderStatusHook.nextStage === 4){
            toggleModal(
                <ConfirmOrderCompletionModalComponent 
                    providerId={provider.id} 
                    confirmedCompletionCallback={advanceOrderStageInModal}
                />
            )
        }
    }

    const declineButtonOnClickHandler = (e) => {
        e.stopPropagation();
        toggleModal(
            <ConfirmOrCancelModal
                prompt={'Do You Really Want to Deny this Order?'}
                onConfirm={denyOrderInModal}         
            />
        )
    }

    return(
        <CardComponent onClickHandler={cardOnClickHandler}>
            <div>
                <div className="bold">Date Issued: </div>
                <div>{order.dateIssued}</div>
            </div>
            <div>
                <div className="bold">Provided Service: </div>
                <div>{service ? service.name : 'Error Loading the Service...'}</div>
            </div>
            <div>
                <div className="bold">Provided by: </div>
                <div>{provider ? provider.firstName + ' ' + provider.lastName : 'Error Loading the Provider...'}</div>
            </div>
            <div>
                <div className="bold">Credits Awarded: </div>
                <div>{order.creditsAwarded ?  order.creditsAwarded : "TBD"}</div>
            </div>
            <ButtonComponent 
                buttonType={orderStatusHook.buttonClassName}
                onClickHandler={buttonOnClickHandler}
            >
                {orderStatusHook.text}
            </ButtonComponent>
            {
                orderStatusHook.orderDirection === 'incoming' && orderStatusHook.nextStage === 2
                &&
                <ButtonComponent
                    buttonType={'cancel'}
                    onClickHandler={declineButtonOnClickHandler}
                >
                    Decline Order
                </ButtonComponent>
            }
        </CardComponent>
    )
}

export default OrderCard