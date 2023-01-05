import { useParams } from "react-router";
import { transactions } from "../../datamodels/transactions/transactions-examples";
import PageContainer from "../../utils/page-container/page-container.component";
import { members } from "../../datamodels/members/members-examples";
import { services } from "../../datamodels/services/services-examples";
import RoundImageContainer from "../profile-avatar/round-image-container.component";

const TransactionPage = () => {

    const { transactionId } = useParams();

    const transactionIdInt = parseInt(transactionId)

    const currentTransaction = transactions.find(transaction => transaction.id === transactionIdInt);

    const providedService = services.find(service => service.id === currentTransaction.serviceId);

    const transactionRecipient = members.find(member => member.id === currentTransaction.receivingUserId);

    const transactionProvider = members.find(member => member.id === currentTransaction.providingUserId);

    return(
        <PageContainer>
            <RoundImageContainer picture={providedService.icon} size={'page'}/>
            <div className="heading-primary">{`Order Of ${providedService.name} at ${currentTransaction.dateIssued}`}</div>
            <div className="text">{`service recipient: ${transactionRecipient.firstName} ${transactionRecipient.lastName}`}</div>
            <div className="text">{`service provider: ${transactionProvider.firstName} ${transactionProvider.lastName}`}</div>
            <div className="text">{`credits awarded: ${currentTransaction.creditsAwarded}`}</div>
        </PageContainer>
    )
}

export default TransactionPage