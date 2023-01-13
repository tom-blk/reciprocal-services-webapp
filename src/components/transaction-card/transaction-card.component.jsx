import { services } from "../../datamodels/services/services-examples";
import { members } from "../../datamodels/members/members-examples";
import { Fragment, useEffect, useState } from "react";
import Modal from "../modal/modal.component";
import { useNavigate } from "react-router";

import axios from "axios";

const TransactionCard = ({transaction}) => {

    const [transactionIsComplete, setTransactionIsComplete] = useState(false);
    const [transactionOrdered, setTransactionOrdered] = useState();
    const [orderConfirmed, setOrderConfirmed] = useState();
    const [orderCompleted, setOrderCompleted] = useState();
    const [completionConfirmed, setCompletionConfirmed] = useState();
    const [orderDenied, setOrderDenied] = useState();

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [service, setService] = useState(undefined);
    const [provider, setProvider] = useState(undefined);

    const navigate = useNavigate();

    const a = axios;

    useEffect(() => {
        transaction.completed = !transaction.completed
    }, [transactionIsComplete])

    useEffect(() => {
        getService()
        getProvider()
    }, [])

    const assertCompletionStatus = () => {
        if(transactionOrdered & !orderConfirmed & !orderDenied & !orderCompleted & !completionConfirmed){
            return('order-pending-button')
        } else if(transactionOrdered & !orderConfirmed & orderDenied & !orderCompleted & !completionConfirmed){
            return('order-denied-button')
        } else if(transactionOrdered & orderConfirmed & !orderDenied & !orderCompleted & !completionConfirmed){
            return('order-confirmed-button')
        } else if(transactionOrdered & orderConfirmed & !orderDenied & orderCompleted & !completionConfirmed){
            return('order-completed-button')
        } else if(transactionOrdered & orderConfirmed & !orderDenied & orderCompleted & completionConfirmed){
            return('order-done-button')
        }
    }

    const getService = () => {
        a.post(`http://localhost:5000/get-single-service/${transaction.serviceId}`, {
            serviceId: transaction.serviceId
        })
        .then(response => {
            setService(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const getProvider = () => {
        a.post(`http://localhost:5000/get-single-user/${transaction.providerId}`, {
            providerId: transaction.providerId
        })
        .then(response => {
            setProvider(response.data)
            console.log(response.data)
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
            <div>{`Credits Awarded: ${transaction.creditsAwarded ?  transaction.creditsAwarded : "TDB"}`}</div>
            {
                transaction.completed
                ?
                <Fragment/>
                :
                <div 
                    className={`button ${transactionIsComplete ? 'inactive-button' : 'confirm-button'}`}
                    onClick={e => openModal(e)}
                >
                    {transactionIsComplete ? "Done!" : "Complete Transaction"}
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