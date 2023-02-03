import { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router";

import { AlertMessageContext } from "../../context/alert-message.context";
import { ModalContext } from "../../context/modal.context";

import useIncomingOrderStatus from "../../hooks/useIncomingOrderStatus";

import CardComponent from "../card/card.component";
import ButtonComponent from "../button/button.component";

import { getFullUser } from "../../api/users/get-single-user";
import { getFullService } from "../../api/services/get-single-service";
import { denyOrder, nextOrderStage } from "../../api/orders/modify-order-status";

const IncomingOrderCard = ({order}) => {

    const { displayError } = useContext(AlertMessageContext);

    const modalContext = useContext(ModalContext);

    const navigate = useNavigate();

    const orderStatus = useIncomingOrderStatus(order);

    const [service, setService] = useState(undefined);
    const [recipient, setRecipient] = useState(undefined);

    useEffect(() => {
        getFullService(order.serviceId, displayError).then(response => setService(response));
        getFullUser(order.receivingUserId, displayError).then(response => setRecipient(response));
    }, [])

    const nextOrderStageButtonOnClick = (e) => {
        e.stopPropagation();
        nextOrderStage(order.id, orderStatus.nextStage , displayError)
    }

    const declineButtonOnClick = (e) => {
        e.stopPropagation();
        denyOrder(order.id, displayError);
    }

    return(
        <CardComponent onClick={e => navigate(`/transactions/${order.id}`)}>
            <div>{`Date Issued: ${order.dateIssued}`}</div>
            <div>{`Requested Service: ${service ? service.name : 'Error Loading the Service...'}`}</div>
            <div>{`Recipient: ${recipient ? recipient.firstName + ' ' + recipient.lastName : 'Error Loading the Provider...'}`}</div>
            <ButtonComponent 
                buttonType={orderStatus.className}
                onClickHandler={nextOrderStageButtonOnClick}
            >
            
                {orderStatus.text}
            </ButtonComponent>
            {
                orderStatus.nextStage === 'confirmed' &&
                <ButtonComponent
                    buttonType={'cancel'}
                    onClickHandler={declineButtonOnClick}
                >
                    Decline Order
                </ButtonComponent>
            }
        </CardComponent>
    )
}

export default IncomingOrderCard