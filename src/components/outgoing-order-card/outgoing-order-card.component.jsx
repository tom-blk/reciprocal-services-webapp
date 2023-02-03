import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

import useOutgoingOrderStatus from "../../hooks/useOutgoingOrderStatus";
import { ModalContext } from "../../context/modal.context";
import CardComponent from "../card/card.component";
import ButtonComponent from "../button/button.component";
import { AlertMessageContext } from "../../context/alert-message.context";
import { getFullService } from "../../api/services/get-single-service";
import { getFullUser } from "../../api/users/get-single-user";
import { nextOrderStage } from "../../api/orders/modify-order-status";

const OutgoingOrderCard = ({order}) => {

    const { displayError } = useContext(AlertMessageContext);

    const modalContext = useContext(ModalContext);

    const navigate = useNavigate()

    const orderStatus = useOutgoingOrderStatus(order);

    const [service, setService] = useState(undefined);
    const [provider, setProvider] = useState(undefined);

    useEffect(() => {
        getFullService(order.serviceId, displayError).then(response => setService(response));
        getFullUser(order.providingUserId, displayError).then(response => setProvider(response)); 
    }, [])


    const nextOrderStageButtonOnClick = (e) => {
        e.stopPropagation();
        nextOrderStage(order.id, orderStatus.nextStage , displayError)
    }

    const openModal = (e) => {
        e.stopPropagation();
        modalContext.setModalIsOpen(true);
    }

    return(
        <CardComponent onClick={e => navigate(`/transactions/${order.id}`)}>
            <div>{`Date Issued: ${order.dateIssued}`}</div>
            <div>{`Provided Service: ${service ? service.name : 'Error Loading the Service...'}`}</div>
            <div>{`Provided by: ${provider ? provider.firstName + ' ' + provider.lastName : 'Error Loading the Provider...'}`}</div>
            <div>{`Credits Awarded: ${order.creditsAwarded ?  order.creditsAwarded : "TBD"}`}</div>
            <ButtonComponent 
                buttonType={orderStatus.className}
                onClickHandler={nextOrderStageButtonOnClick}
            >
                {orderStatus.text}
            </ButtonComponent>
        </CardComponent>
    )
}

export default OutgoingOrderCard