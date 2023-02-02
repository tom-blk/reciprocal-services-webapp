import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

import useTransactionCompletionStatus from "../../hooks/useTransactionCompletionStatus";
import { ModalContext } from "../../context/modal.context";
import CardComponent from "../card/card.component";
import ButtonComponent from "../button/button.component";
import { AlertMessageContext } from "../../context/alert-message.context";

const OutgoingOrderCard = ({order}) => {

    const { displayError } = useContext(AlertMessageContext);

    const modalContext = useContext(ModalContext);

    const navigate = useNavigate()

    const transactionStatus = useTransactionCompletionStatus(order);

    const [service, setService] = useState(undefined);
    const [provider, setProvider] = useState(undefined);

    useEffect(() => {
        getService()
        getProvider()
    }, [])

    const getService = () => {
        axios.post(`http://localhost:5000/get-full-service-details/${order.serviceId}`, {
            serviceId: order.serviceId
        })
        .then(response => {
            setService(response.data)
        })
        .catch(error => {
            displayError(error)
        })
    }

    const getProvider = () => {
        axios.post(`http://localhost:5000/get-full-user-details/${order.providingUserId}`, {
            userId: order.providingUserId
        })
        .then(response => {
            setProvider(response.data)
        })
        .catch(error => {
            displayError(error)
        })
    }

    const openModal = (e) => {
        e.stopPropagation();
        modalContext.setModalIsOpen(true);
    }

    return(
        <CardComponent onClick={e => navigate(`/transactions/${order.id}`)}>
            <div>{`Date Issued: ${order.dateIssued}`}</div>
            <div>{`Provided Service: ${service ? service.name : 'Error Loading the Service...'}`}</div>
            <div>{`Provided by: ${provider ? provider.firstName + provider.lastName : 'Error Loading the Provider...'}`}</div>
            <div>{`Credits Awarded: ${order.creditsAwarded ?  order.creditsAwarded : "TBD"}`}</div>
            <ButtonComponent 
                buttonType={transactionStatus.className}
                onClick={e => openModal(e)}
            >
                {transactionStatus.text}
            </ButtonComponent>
        </CardComponent>
    )
}

export default OutgoingOrderCard