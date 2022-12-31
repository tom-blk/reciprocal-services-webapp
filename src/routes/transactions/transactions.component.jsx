import { Link } from "react-router-dom";
import TransactionCard from "../../components/transaction-card/transaction-card.component";
import { transactions } from "../../datamodels/transactions/transactions-examples";

const Transactions = () => {

    return(
        <div>
            <div>Pending Transactions</div>
            {
                transactions.map((transaction) => {
                    if(transaction.completed !== true){
                       return(
                            <Link key={transaction.id} to={`/transactions/${transaction.id}`}>
                                <TransactionCard transaction={transaction}/>
                            </Link>
                        ) 
                    } 
                })
            }
            <div>Completed Transactions</div>
            {
                transactions.map((transaction) => {
                    if(transaction.completed === true){
                        return(
                            <Link key={transaction.id} to={`/transactions/${transaction.id}`}>
                                <TransactionCard transaction={transaction}/>
                            </Link>
                        )
                    } 
                })
            }
        </div>
    )
}

export default Transactions