import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ModalContext } from "../../context/modal.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import useOrderStatus from "../../hooks/useOrderStatus";

import CardComponent from "../card/card.component";
import ButtonComponent from "../button/button.component";
import ConfirmOrderCompletionModalComponent from "../modal/confirm-order-completion-modal.component";

import { getFullUser } from "../../api/users/get-single-user";
import { modifyOrderStatus } from "../../api/orders/modify-order-status";
import { UserContext } from "../../context/user.context";
import ConfirmOrCancelModal from "../modal/confirm-or-cancel-modal.component";
import { getService } from "../../api/services/get-service";


const OrderCard = ({order}) => {

    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    const { testUser } = useContext(UserContext);
    const { toggleModal } = useContext(ModalContext);

    const navigate = useNavigate()

    const [service, setService] = useState(undefined);
    const [provider, setProvider] = useState(undefined);
    const [tempOrder, setTempOrder] = useState(order); //MIMICS THE CHANGES IN THE DATABASE SO THAT CHANGES BECOME APPARENT WITHOUT HAVING TO REFETCH THE DATA

    const orderStatusHook = useOrderStatus(tempOrder, testUser.id);

    useEffect(() => {
        getService(order.serviceId, displayError).then(response => setService(response));
        getFullUser(order.providingUserId, displayError).then(response => setProvider(response)); 
    }, [])
    
    const cardOnClickHandler = () => {
        navigate(`/outgoing-orders/${order.id}`)
    }

    const advanceOrderStageInModal = (e) => {
        if(orderStatusHook.nextStage)
        modifyOrderStatus(order.id, orderStatusHook.nextStage, displaySuccessMessage, displayError).then(
            setTempOrder({...tempOrder, status: tempOrder.status + 1})
        )
    }

    const denyOrderInModal = () => {
        modifyOrderStatus(order.id, 5, displaySuccessMessage, displayError).then(
            setTempOrder({...tempOrder, status: 5})
        )
    }

    const buttonOnClickHandler = (e) => {
        e.stopPropagation();
        if(orderStatusHook.nextStage && orderStatusHook.nextStage != 4)
        toggleModal(
            <ConfirmOrCancelModal
                prompt={'Do You Really Want to Proceed with this Order?'}
                onConfirm={advanceOrderStageInModal}         
            />
        )
        if(orderStatusHook.nextStage === 4)
        toggleModal(
            <ConfirmOrderCompletionModalComponent 
                providerId={provider.id} 
                confirmedCompletionCallback={advanceOrderStageInModal}
            />
        )
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