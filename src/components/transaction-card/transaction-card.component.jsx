import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios";

import "./transaction-card.styles.scss";
import useTransactionCompletionStatus from "../../hooks/useTransactionCompletionStatus";
import { AppContext } from "../../context/app-context";

const TransactionCard = ({transaction}) => {

    const navigate = useNavigate()

    const transactionStatus = useTransactionCompletionStatus(transaction);

    const appContext = useContext(AppContext);

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
            console.log(error)
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
            console.log(error)
        })
    }

    const openModal = (e) => {
        e.stopPropagation();
        appContext.setModalIsOpen(true);
    }

    return(
        <div className="card" onClick={e => navigate(`/transactions/${transaction.id}`)}>
            <div>{`Date Issued: ${transaction.dateIssued}`}</div>
            <div>{`Provided Service: ${service ? service.name : 'Error Loading the Service...'}`}</div>
            <div>{`Provided by: ${provider ? provider.firstName + provider.lastName : 'Error Loading the Provider...'}`}</div>
            <div>{`Credits Awarded: ${transaction.creditsAwarded ?  transaction.creditsAwarded : "TBD"}`}</div>
            <div 
                className={`button ${transactionStatus.className}`}
                onClick={e => openModal(e)}
            >
                {transactionStatus.text}
            </div>
        </div>
    )
}

export default TransactionCard