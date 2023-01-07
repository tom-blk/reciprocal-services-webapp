import { services } from "../../datamodels/services/services-examples";
import { members } from "../../datamodels/members/members-examples";
import { Fragment, useEffect, useState } from "react";
import Modal from "../modal/modal.component";
import { useNavigate } from "react-router";

const TransactionCard = ({transaction}) => {

    const [transactionIsComplete, setTransactionIsComplete] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        transaction.completed = !transaction.completed
    }, [transactionIsComplete])

    const findService = () => {
        return(services.find(service => service.id === transaction.service_id).name)
    }

    const findProvidingUser = () => {
        const providingUser = members.find(provider => provider.id === transaction.providing_user_id);
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
        <div className="card" onClick={e => navigate(`/transactions/${transaction.id}`)}>
            <div>{`Date Issued: ${transaction.date_issued}`}</div>
            <div>{`Provided Service: ${findService()}`}</div>
            <div>{`Provided by: ${findProvidingUser()}`}</div>
            <div>{`Credits Awarded: ${transaction.credits_awarded}`}</div>
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