import { useContext, useEffect, useState } from "react";
import { Order } from "../../../types/orders";
import { Service } from "../../../types/services";
import { Provider } from "../../../types/users";

import { ModalContext } from "../../../context/modal.context";
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
import { assertDisplayName } from "../../../helper-functions/users/assertDisplayName";

import './order-card.styles.scss';
import { toast } from "react-toastify";
import AlertMessageComponent from "../../alerts/alert-message.component";
import { errorMessageOptions } from "../../alerts/alertMessageTypes";

const OrderCard = ({order} : {order: Order}) => {

    const { user } = useContext(UserContext);
    const { toggleModal } = useContext(ModalContext);

    const [service, setService] = useState<Service | undefined>(undefined);
    const [provider, setProvider] = useState<Provider | undefined>(undefined);
    const [recipient, setRecipient] = useState<Provider | undefined>(undefined);
    const [tempOrder, setTempOrder] = useState<Order>(order); // Mimics updates on the database so that data doesn't have to be re-fetched (makes updating process feel faster), also prevents being immedeatly re-sorted into other order status lists, see onOrderStageModified function

    const navigate = useNavigate()
    const orderStatus = useOrderStatus(tempOrder, user?.id);
    const correspondingUserRole = orderStatus.correspondingUserRole;

    useEffect(() => {
        getService(order.serviceId)
            .then(response => setService(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
        
    }, [order.serviceId])

    useEffect(() => {
        if(correspondingUserRole === 'Provider')
        getSingleUser(order.providingUserId)
            .then(response => setProvider(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})

        if(correspondingUserRole === 'Recipient')
        getSingleUser(order.receivingUserId)
            .then(response => setRecipient(response))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
    }, [order.providingUserId, order.receivingUserId, correspondingUserRole])
    
    const cardOnClickHandler = () => {
        navigate(`/outgoing-orders/${order.id}`)
    }

    // Needs to be passed all the way through to the function that ultimately calls the api to update the database so that it can update the frontend after update is successful (makes updating process feel faster)
    const onOrderStageModified = () => {
        if(orderStatus.nextStage)
        setTempOrder({...tempOrder, status: orderStatus.nextStage})
    }

    // Needs to be passed all the way through to the function that ultimately calls the api to update the database so that it can update the frontend after update is successful (makes updating process feel faster)
    const onOrderStageDeclined = () => {
        setTempOrder({...tempOrder, status: 5})
    }

    const buttonOnClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if(orderStatus.nextStage)
        toggleModal(returnAppropriateOrderModal(user!.id, tempOrder, orderStatus.nextStage, onOrderStageModified));
    }

    const declineButtonOnClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();

        const denyOrderInModal = () => setOrderStageToDenied(tempOrder, onOrderStageDeclined);

        toggleModal( <ConfirmOrCancelModal prompt={'Do You Really Want to Deny this Order?'} onConfirm={denyOrderInModal}/> )
    }

    const returnConditionalDateContainer = () => {
        if(orderStatus.currentStage === 4){
            return(
                <div>
                    <div className="bold nowrap">Date Completed: </div>
                    <div>{order.dateCompleted}</div>
                </div>
            )
        }else{
            return(
                <div>
                    <div className="bold nowrap">Date Issued: </div>
                    <div>{order.dateIssued}</div>
                </div>
            )
        }
    }

    const returnConditionalTotalEmbers = () => {
        if(orderStatus.currentStage >= 3 && orderStatus.currentStage !== 5 && order.hoursProvided)
        return(
            <div>
                <div className="bold">Total Embers: </div>
                <div>{order.hoursProvided * order.creditsPerHour}</div>
            </div>
        )
    }

    const returnConditionalProviderOrRecipient = () => {
        if(orderStatus.correspondingUserRole === 'Provider')
        return(
            <div className="overflow-control">
                <div className="bold">Provider: </div>
                <div className="overflow-control">{provider ? assertDisplayName(provider) : 'Error Loading the Provider...'}</div>
            </div>
        )
        if(orderStatus.correspondingUserRole === 'Recipient')
        return(
            <div className="overflow-control">
                <div className="bold">Recipient: </div>
                <div className="overflow-control">{recipient ? assertDisplayName(recipient) : 'Error Loading the Recipient...'}</div>
            </div>
        )
    }

    const returnConditionalCancelButton = () => {
        if(orderStatus.orderDirection === 'incoming' && orderStatus.nextStage === 2)
        return(
            <ButtonComponent
                buttonType={'cancel'}
                onClickHandler={declineButtonOnClickHandler}
            >
                Decline
            </ButtonComponent>
        )
    }

    return(
        <CardComponent onClickHandler={cardOnClickHandler}>
            <div className={`${(orderStatus.currentStage > 2 && orderStatus.currentStage < 5 ) ? 'order-card-container-5-cols' : 'order-card-container-4-cols'}`}>

                { returnConditionalDateContainer() }

                <div className="overflow-control">
                    <div className="bold">Service: </div>
                    <div className="overflow-control">{service ? service.name : 'Error Loading the Service...'}</div>
                </div>

                { returnConditionalProviderOrRecipient() }

                { returnConditionalTotalEmbers() }

                <div className='order-card-button-container'>
                    <ButtonComponent 
                        buttonType={orderStatus.buttonClassName}
                        onClickHandler={buttonOnClickHandler}
                    >
                        {orderStatus.text}
                    </ButtonComponent>

                    { returnConditionalCancelButton() }
                </div>

            </div>

        </CardComponent>
    )
}

export default OrderCard