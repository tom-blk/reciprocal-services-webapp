const TransactionCard = ({transaction}) => {
    return(
        <div>
            <div>{transaction.dateIssued}</div>
            <div>{transaction.receivingUserId}</div>
            <div>{transaction.providingUserId}</div>
            <div>{transaction.creditsAwarded}</div>
        </div>
    )
}

export default TransactionCard