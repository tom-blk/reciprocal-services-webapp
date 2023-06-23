import { useContext, useEffect, useState } from "react";

import { ModalContext } from "../../../context/modal.context";
import { AlertMessageContext } from "../../../context/alert-message.context";
import { UserContext } from "../../../context/user.context";

import useOrderStatus from "../../../hooks/useOrderStatus";

import CardComponent from "../card.component"
import ButtonComponent from "../../buttons/button.component";
import ConfirmOrCancelModal from "../../modals/confirmOrCancel/confirm-or-cancel-modal.component";

import { getService } from "../../../api/services/read";
import { getSingleUser } from "../../../api/users/read";

import { useNavigate } from "react-router";
import { returnAppropriateOrderModal } from "../../../helper-functions/orders/returnAppropriateOrderModal";
import { setOrderStageToDenied } from "../../../helper-functions/orders/setOrderStageToDenied";

const OrderCard = ({order}) => {

    const { displayError } = useContext(AlertMessageContext);
    const { user } = useContext(UserContext);
    const { toggleModal } = useContext(ModalContext);

    const [service, setService] = useState(undefined);
    const [provider, setProvider] = useState(undefined);
    const [tempOrder, setTempOrder] = useState(order); // Mimics updates on the database so that data doesn't have to be re-fetched (makes updating process feel faster), see onOrderStageModified function

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

    // Needs to be passed all the way through to the function that ultimately calls the api to update the database so that it can update the frontend after update is successful (makes updating process feel faster)
    const onOrderStageModified = () => {
        setTempOrder({...tempOrder, status: orderStatusHook.nextStage})
    }

    const buttonOnClickHandler = (e) => {
        e.stopPropagation();
        toggleModal(returnAppropriateOrderModal(tempOrder, orderStatusHook.nextStage, onOrderStageModified, displayError))
    }

    const declineButtonOnClickHandler = (e) => {
        e.stopPropagation();

        const denyOrderInModal = () => setOrderStageToDenied(tempOrder, onOrderStageModified, displayError);

        toggleModal( <ConfirmOrCancelModal prompt={'Do You Really Want to Deny this Order?'} onConfirm={denyOrderInModal}/> )
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