import TransactionCard from "../transaction-card/transaction-card.component";

const TransactionsList = ({ transactions }) => {

    return(
        <div className="card-list">
            {
                transactions 
                ?
                transactions.map((transaction) => {
                    return(
                            <TransactionCard key={transaction.id} transaction={transaction}/>
                        ) 
                    } 
                )
                :
                <div className="text">No Transactions currently pending...</div>
            }
        </div>
    )
}

export default TransactionsList