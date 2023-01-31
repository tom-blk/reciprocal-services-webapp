import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

import "./transaction-card.styles.scss";
import useTransactionCompletionStatus from "../../hooks/useTransactionCompletionStatus";
import { ModalContext } from "../../context/modal.context";
import CardComponent from "../card/card.component";
import ButtonComponent from "../button/button.component";
import { AlertMessageContext } from "../../context/alert-message.context";

const TransactionCard = ({transaction}) => {

    const { displayError } = useContext(AlertMessageContext);

    const modalContext = useContext(ModalContext);

    const navigate = useNavigate()

    const transactionStatus = useTransactionCompletionStatus(transaction);

    const [service, setService] = useState(undefined);
    const [provider, setProvider] = useState(undefined);

    useEffect(() => {
        getService()
        getProvider()
    }, [])

    const getService = () => {
        axios.post(`http://localhost:5000/get-full-service-details/${transaction.serviceId}`, {
            serviceId: transaction.serviceId
        })
        .then(response => {
            setService(response.data)
        })
        .catch(error => {
            displayError(error)
        })
    }

    const getProvider = () => {
        axios.post(`http://localhost:5000/get-full-user-details/${transaction.providingUserId}`, {
            userId: transaction.providingUserId
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
        <CardComponent onClick={e => navigate(`/transactions/${transaction.id}`)}>
            <div>{`Date Issued: ${transaction.dateIssued}`}</div>
            <div>{`Provided Service: ${service ? service.name : 'Error Loading the Service...'}`}</div>
            <div>{`Provided by: ${provider ? provider.firstName + provider.lastName : 'Error Loading the Provider...'}`}</div>
            <div>{`Credits Awarded: ${transaction.creditsAwarded ?  transaction.creditsAwarded : "TBD"}`}</div>
            <ButtonComponent 
                buttonType={transactionStatus.className}
                onClick={e => openModal(e)}
            >
                {transactionStatus.text}
            </ButtonComponent>
        </CardComponent>
    )
}

export default TransactionCard