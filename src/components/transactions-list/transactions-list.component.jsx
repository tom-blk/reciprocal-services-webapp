import TransactionCard from "../transaction-card/transaction-card.component";

const TransactionsList = ({completed, transactions}) => {

    console.log(transactions);

    return(
        <div className="card-list">
            {
                transactions.map((transaction) => {
                    return(
                            <TransactionCard key={transaction.id} transaction={transaction}/>
                        ) 
                    } 
                )
            }
        </div>
    )
}

export default TransactionsList