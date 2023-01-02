import { services } from "../../datamodels/services/services-examples";
import { members } from "../../datamodels/members/members-examples";

const TransactionCard = ({transaction}) => {

    const findService = () => {
        return(services.find(service => service.id === transaction.serviceId).name)
    }

    const findProvidingUser = () => {
        const providingUser = members.find(provider => provider.id === transaction.providingUserId);
        return(providingUser.firstName + " " + providingUser.lastName)
    }

    return(
        <div className="card">
            <div>{`Date Issued: ${transaction.dateIssued}`}</div>
            <div>{`Provided Service: ${findService()}`}</div>
            <div>{transaction.receivingUserId}</div>
            <div>{`Provided by: ${findProvidingUser()}`}</div>
            <div>{`Credits Awarded: ${transaction.creditsAwarded}`}</div>
            <div className="button confirm-button">Click Here If Transaction is Complete</div>
        </div>
    )
}

export default TransactionCard