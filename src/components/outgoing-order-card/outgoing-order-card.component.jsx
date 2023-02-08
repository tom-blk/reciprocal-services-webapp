import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { ModalContext } from "../../context/modal.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import useOutgoingOrderStatus from "../../hooks/useOutgoingOrderStatus";

import CardComponent from "../card/card.component";
import ButtonComponent from "../button/button.component";
import ConfirmOrderCompletionModalComponent from "../modal/confirm-order-completion-modal.component";

import { getFullService } from "../../api/services/get-single-service";
import { getFullUser } from "../../api/users/get-single-user";
import { nextOrderStage } from "../../api/orders/modify-order-status";


const OutgoingOrderCard = ({order}) => {

    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);

    const {toggleModal} = useContext(ModalContext);

    const navigate = useNavigate()

    const orderStatus = useOutgoingOrderStatus(order);

    const [service, setService] = useState(undefined);
    const [provider, setProvider] = useState(undefined);

    useEffect(() => {
        getFullService(order.serviceId, displayError).then(response => setService(response));
        getFullUser(order.providingUserId, displayError).then(response => setProvider(response)); 
    }, [])

    const advanceOrderStageInModal = (e) => {
        nextOrderStage(order.id, orderStatus.nextStage, displaySuccessMessage, displayError)
    }

    const onClickHandler = (e) => {
        e.stopPropagation();
        if(orderStatus.nextStage)
        toggleModal(
            <ConfirmOrderCompletionModalComponent 
                providerId={provider.id} 
                confirmedCompletionCallback={advanceOrderStageInModal}
            />
        )
    }

    return(
        <CardComponent onClick={e => navigate(`/transactions/${order.id}`)}>
            <div>{`Date Issued: ${order.dateIssued}`}</div>
            <div>{`Provided Service: ${service ? service.name : 'Error Loading the Service...'}`}</div>
            <div>{`Provided by: ${provider ? provider.firstName + ' ' + provider.lastName : 'Error Loading the Provider...'}`}</div>
            <div>{`Credits Awarded: ${order.creditsAwarded ?  order.creditsAwarded : "TBD"}`}</div>
            <ButtonComponent 
                buttonType={orderStatus.className}
                onClickHandler={onClickHandler}
            >
                {orderStatus.text}
            </ButtonComponent>
        </CardComponent>
    )
}

export default OutgoingOrderCard