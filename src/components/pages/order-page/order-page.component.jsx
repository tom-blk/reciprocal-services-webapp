import { Fragment, useContext, useEffect, useState } from "react";

import { AlertMessageContext } from "../../../context/alert-message.context";
import { ModalContext } from "../../../context/modal.context";
import { UserContext } from "../../../context/user.context";

import useOrderStatus from "../../../hooks/useOrderStatus";

import PageContainer from "../../../utils/page-container/page-container.component";
import ButtonComponent from "../../buttons/button.component";
import ConfirmOrCancelModal from "../../modals/confirmOrCancel/confirm-or-cancel-modal.component";
import RoundImageContainer from "../../round-image-container/round-image-container.component";

import { getService } from "../../../api/services/read";
import { getSingleUser } from "../../../api/users/read";
import { getSingleOrder } from "../../../api/orders/read";

import { useParams } from "react-router";

import "./order-page.styles.scss"
import { returnAppropriateOrderModal } from "../../../helper-functions/orders/returnAppropriateOrderModal";
import { setOrderStageToDenied } from "../../../helper-functions/orders/setOrderStageToDenied";
import { getFileUrl } from "../../../utils/web3storage/web3storage";

const OrderPage = () => {

    const { displayError } = useContext(AlertMessageContext);
    const { toggleModal } = useContext(ModalContext);
    const { user } = useContext(UserContext);

    const { orderId } = useParams();

    const orderIdInt = parseInt(orderId);

    const [tempOrder, setTempOrder] = useState(undefined); //MIMICS THE CHANGES IN THE DATABASE SO THAT CHANGES BECOME APPARENT WITHOUT HAVING TO REFETCH THE DATA
    const [service, setService] = useState(undefined);
    const [serviceIcon, setServiceIcon] = useState(undefined);
    const [correspondingUser, setCorrespondingUser] = useState(undefined);
    
    const orderStatus = useOrderStatus(tempOrder, user.id);

    useEffect(() => {
        getSingleOrder(orderIdInt)
            .then(response => setTempOrder(response))
            .catch(error => displayError(error))
    }, [])

    useEffect(() => {
        if(tempOrder){
            getService(tempOrder.serviceId, displayError)
                .then(response => setService(response))
                .catch(error => displayError(error))
            if(orderStatus.orderDirection === 'incoming'){
                getSingleUser(tempOrder.receivingUserId, displayError)
                    .then(response => setCorrespondingUser(response))
                    .catch(error => displayError(error))
            } else if(orderStatus.orderDirection === 'outgoing'){
                getSingleUser(tempOrder.providingUserId, displayError)
                    .then(response => setCorrespondingUser(response))
                    .catch(error => displayError(error))
            }
        }
    }, [tempOrder])

    useEffect(() => {
        if(service)
        if(service.icon)
        getFileUrl(service.icon)
            .then(response => setServiceIcon(response));
    }, [service])

     // Needs to be passed all the way through to the function that ultimately calls the api to update the database so that it can update the frontend after update is successful (makes updating process feel faster)
     const onOrderStageModified = () => {
        setTempOrder({...tempOrder, status: orderStatus.nextStage})
    }

    // Needs to be passed all the way through to the function that ultimately calls the api to update the database so that it can update the frontend after update is successful (makes updating process feel faster)
    const onOrderStageDeclined = () => {
        setTempOrder({...tempOrder, status: 5})
    }

    const buttonOnClickHandler = () => {
        toggleModal(returnAppropriateOrderModal(tempOrder, orderStatus.nextStage, onOrderStageModified, displayError));
    }

    const declineButtonOnClickHandler = () => {
        const denyOrderInModal = () => setOrderStageToDenied(tempOrder, onOrderStageDeclined, displayError);

        toggleModal( <ConfirmOrCancelModal prompt={'Do You Really Want to Deny this Order?'} onConfirm={denyOrderInModal}/> )
    }

    const returnConditionalCancelButton = () => {
        if(orderStatus.orderDirection === 'incoming' && orderStatus.nextStage === 2)
        return(
            <ButtonComponent
                buttonType={'cancel'}
                onClickHandler={declineButtonOnClickHandler}
            >
                Decline Order
            </ButtonComponent>
        )
    }

    const returnConditionalDateCompleted = () => {
        if(orderStatus.currentStage === 4)
        return(
            <span>{`Date Completed: ${tempOrder.dateCompleted.toLocaleString()}`}</span>
        )
    }

    const returnConditionalTotalEmbers = () => {
        if(orderStatus.currentStage >= 3)
        return(
                <span className="bold">{`Total Embers: ${tempOrder.hoursProvided * tempOrder.creditsPerHour}`}</span>
        )
    }

    return(
        <PageContainer>
            {
                tempOrder && service && correspondingUser
                ?
                <Fragment>
                    <div className="transaction-page-heading">
                        <RoundImageContainer picture={serviceIcon} serviceOrUser={'service'} size={'round-image-container-page'}/>
                        <h1>{`Order Of ${service.name}`}</h1>
                    </div>

                    <span>{`${orderStatus.correspondingUserRole}: ${correspondingUser.firstName} ${correspondingUser.lastName}`}</span>
                    <span>{`Date Issued: ${tempOrder.dateIssued.toLocaleString()}`}</span>
                    { returnConditionalDateCompleted() }
                    { returnConditionalTotalEmbers() }

                    <span>Message: 
                        <pre>{tempOrder.message}</pre>
                    </span>

                    <ButtonComponent 
                        buttonType={orderStatus.buttonClassName}
                        onClickHandler={buttonOnClickHandler}
                    >
                        {orderStatus.text}
                    </ButtonComponent>
                    { returnConditionalCancelButton() }
                </Fragment>
                :
                <span>Something went wrong...</span>
            }
            
        </PageContainer>
    )
}

export default OrderPage