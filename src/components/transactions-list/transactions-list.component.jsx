import { transactions } from "../../datamodels/transactions/transactions-examples";
import TransactionCard from "../transaction-card/transaction-card.component";
import { useNavigate } from "react-router";

const TransactionsList = ({completed}) => {

    const navigate = useNavigate();

    return(
        <div className="card-list">
        {
            transactions.map((transaction) => {
                if(transaction.completed === completed){
                return(
                        <div key={transaction.id} onClick={e => navigate(`/transactions/${transaction.id}`)}>
                            <TransactionCard transaction={transaction}/>
                        </div>
                    ) 
                } 
            })
        }
    </div>
    )
}

export default TransactionsList