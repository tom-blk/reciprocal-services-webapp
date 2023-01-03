import { services } from "../../datamodels/services/services-examples";
import { members } from "../../datamodels/members/members-examples";
import { Fragment, useEffect, useState } from "react";
import Modal from "../modal/modal.component";

const TransactionCard = ({transaction}) => {

    const [transactionIsComplete, setTransactionIsComplete] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        transaction.completed = !transaction.completed
    }, [transactionIsComplete])

    const findService = () => {
        return(services.find(service => service.id === transaction.serviceId).name)
    }

    const findProvidingUser = () => {
        const providingUser = members.find(provider => provider.id === transaction.providingUserId);
        return(providingUser.firstName + " " + providingUser.lastName)
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
        <div className="card">
            <div>{`Date Issued: ${transaction.dateIssued}`}</div>
            <div>{`Provided Service: ${findService()}`}</div>
            <div>{`Provided by: ${findProvidingUser()}`}</div>
            <div>{`Credits Awarded: ${transaction.creditsAwarded}`}</div>
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