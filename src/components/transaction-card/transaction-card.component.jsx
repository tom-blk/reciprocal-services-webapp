import { services } from "../../datamodels/services/services-examples";
import { members } from "../../datamodels/members/members-examples";
import { useEffect, useState } from "react";

const TransactionCard = ({transaction}) => {

    useEffect(() => {
        if(transaction.completed === false){
            setTransactionIsComplete(false);
        }
    }, [])

    const [transactionIsComplete, setTransactionIsComplete] = useState(false);

    const findService = () => {
        return(services.find(service => service.id === transaction.serviceId).name)
    }

    const findProvidingUser = () => {
        const providingUser = members.find(provider => provider.id === transaction.providingUserId);
        return(providingUser.firstName + " " + providingUser.lastName)
    }

    const modifyTransactionStatus = () => {
        transaction.completed = !transaction.completed
    }

    const renderTransactionText = () => {
        if(transactionIsComplete){
            return(
                "Done!"
            )
        } else {
            return(
                "Complete Transaction"
            )
        }
    }

    return(
        <div className="card">
            <div>{`Date Issued: ${transaction.dateIssued}`}</div>
            <div>{`Provided Service: ${findService()}`}</div>
            <div>{transaction.receivingUserId}</div>
            <div>{`Provided by: ${findProvidingUser()}`}</div>
            <div>{`Credits Awarded: ${transaction.creditsAwarded}`}</div>
            <div 
                className="button confirm-button"
                onClick={e => modifyTransactionStatus()}
            >
                {renderTransactionText()}
            </div>
        </div>
    )
}

export default TransactionCard