import { useParams } from "react-router"
import { transactions } from "../../datamodels/transactions/transactions-examples";

const TransactionPage = () => {

    const { transactionId } = useParams();

    const transactionIdInt = parseInt(transactionId)

    const currentTransaction = transactions.find(transaction => transaction.id === transactionIdInt);

    return(
        <div>
            <div>{"This is Transaction " + currentTransaction.id}</div>
            <div>{"Service Recipient: " + currentTransaction.receivingUserId}</div>
            <div>{"Service Provider: " + currentTransaction.providingUserId}</div>
        </div>
    )
}

export default TransactionPage