import { services } from "../../datamodels/services/services-examples";
import { members } from "../../datamodels/members/members-examples";
import { Fragment, useEffect, useState } from "react";
import Modal from "../modal/modal.component";
import { useNavigate } from "react-router";

import axios from "axios";

import "./transaction-card.styles.scss";
import useTransactionCompletionStatus from "../../hooks/useTransactionCompletionStatus";

const TransactionCard = ({transaction}) => {

    const navigate = useNavigate()

    const [transactionIsComplete, setTransactionIsComplete] = useState(false);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [service, setService] = useState(undefined);
    const [provider, setProvider] = useState(undefined);

    const transactionStatus = useTransactionCompletionStatus(transaction);

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

    const modifyTransactionStatusAndCloseModal = (e) => {
        e.stopPropagation();
        setTransactionIsComplete(!transactionIsComplete);
        setModalIsOpen(false);
    }

    const openModal = (e) => {
        e.stopPropagation();
        if(!transactionIsComplete)
        setModalIsOpen(true);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setModalIsOpen(false);
    }

    return(
        <div className="card" onClick={e => navigate(`/transactions/${transaction.id}`)}>
            <div>{`Date Issued: ${transaction.dateIssued}`}</div>
            <div>{`Provided Service: ${service ? service.name : 'Error Loading the Service...'}`}</div>
            <div>{`Provided by: ${provider ? provider.firstName + provider.lastName : 'Error Loading the Provider...'}`}</div>
            <div>{`Credits Awarded: ${transaction.creditsAwarded ?  transaction.creditsAwarded : "TBD"}`}</div>
            {
                transaction.completed
                ?
                <Fragment/>
                :
                <div 
                    className={`button ${transactionStatus.className}`}
                    onClick={e => openModal(e)}
                >
                    {transactionStatus.text}
                </div>
            }
            {
                modalIsOpen
                ?
                <Modal 
                    heading={"Confirm Completion"} 
                    text={"Do you really wish to confirm that this transation has been completed?"}
                    onConfirm={modifyTransactionStatusAndCloseModal}
                    onClose={closeModal}
                />
                :
                <Fragment/>
            }
        </div>
    )
}

export default TransactionCard