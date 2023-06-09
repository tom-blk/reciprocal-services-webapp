import { Fragment, useContext, useEffect, useState } from "react";

import { AlertMessageContext } from "../../context/alert-message.context";
import { ModalContext } from "../../context/modal.context";
import { UserContext } from "../../context/user.context";

import useOrderStatus from "../../hooks/useOrderStatus";

import PageContainer from "../../utils/page-container/page-container.component";
import ButtonComponent from "../button/button.component";
import ConfirmOrCancelModal from "../modal/confirm-or-cancel-modal.component";
import ConfirmOrderCompletionModalComponent from "../modal/confirm-order-completion-modal.component";
import RoundImageContainer from "../round-image-container/round-image-container.component";

import { getService } from "../../api/services/read";
import { getSingleUser } from "../../api/users/read";
import { getSingleOrder } from "../../api/orders/read";
import { modifyOrderStatus } from "../../api/orders/update";

import { useParams } from "react-router";

import "./order-page.styles.scss"

const OrderPage = () => {

    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    const { toggleModal } = useContext(ModalContext);
    const { testUser } = useContext(UserContext);

    const { orderId } = useParams();

    const orderIdInt = parseInt(orderId);

    const [tempOrder, setTempOrder] = useState(undefined); //MIMICS THE CHANGES IN THE DATABASE SO THAT CHANGES BECOME APPARENT WITHOUT HAVING TO REFETCH THE DATA
    const [service, setService] = useState(undefined);
    const [correspondingUser, setCorrespondingUser] = useState(undefined);
    
    const orderStatusHook = useOrderStatus(tempOrder, testUser.id);

    useEffect(() => {
        getSingleOrder(orderIdInt)
            .then(response => setTempOrder(response))
            .catch(error => displayError(error))
    }, [])

    useEffect(() => {
        if(tempOrder){
            console.log(tempOrder)
            getService(tempOrder.serviceId, displayError)
                .then(response => setService(response))
                .catch(error => displayError(error))
            if(orderStatusHook.orderDirection === 'incoming'){
                getSingleUser(tempOrder.receivingUserId, displayError)
                    .then(response => setCorrespondingUser(response))
                    .catch(error => displayError(error))
            } else if(orderStatusHook.orderDirection === 'outgoing'){
                getSingleUser(tempOrder.providingUserId, displayError)
                    .then(response => setCorrespondingUser(response))
                    .catch(error => displayError(error))
            }
        }
    }, [tempOrder])

    const advanceOrderStageInModal = (e) => {
        if(orderStatusHook.nextStage)
        modifyOrderStatus(tempOrder.id, orderStatusHook.nextStage, displaySuccessMessage, displayError)
            .then(setTempOrder({...tempOrder, status: tempOrder.status +1}))
            .catch(error => displayError(error))
    }

    const denyOrderInModal = () => {
        modifyOrderStatus(tempOrder.id, 5, displaySuccessMessage, displayError)
            .then(setTempOrder({...tempOrder, status: 5}))
            .catch(error => displayError(error))
    }

    const buttonOnClickHandler = (e) => {
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
                providerId={correspondingUser.id} 
                confirmedCompletionCallback={advanceOrderStageInModal}
            />
        )
    }

    const declineButtonOnClickHandler = (e) => {
        toggleModal(
            <ConfirmOrCancelModal
                prompt={'Do You Really Want to Deny this Order?'}
                onConfirm={denyOrderInModal}         
            />
        )
    }

    return(
        <PageContainer>
            {
                tempOrder && service && correspondingUser
                ?
                <Fragment>
                    <div className="transaction-page-heading">
                        <RoundImageContainer picture={service.icon} size={'page'}/>
                        <h1>{`Order Of ${service.name} at ${tempOrder.dateIssued.toLocaleString()}`}</h1>
                    </div>
                    <span>{`${orderStatusHook.correspondingUserRole}: ${correspondingUser.firstName} ${correspondingUser.lastName}`}</span>
                    <span>Message: 
                        <pre>{tempOrder.message}</pre>
                    </span>
                    <span>{tempOrder.creditsAwarded && `credits awarded: ${tempOrder.creditsAwarded}`}</span>
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
                </Fragment>
                :
                <span>Something went wrong...</span>
            }
            
        </PageContainer>
    )
}

export default OrderPage