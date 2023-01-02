import { Link } from "react-router-dom";
import TransactionCard from "../../components/transaction-card/transaction-card.component"
import { transactions } from "../../datamodels/transactions/transactions-examples.js"
import TrendingServicesList from "../../components/trending-services-list/trending-services-list.component";

const Home = () => {
    return (
      <div className="home">
        <h1 className="home-heading">Home</h1>
        <h2>Trending Services: </h2>
        <TrendingServicesList/>
        <h2>Pending Transactions: </h2>
        <div className="card-list">
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
        </div>
      </div>
    );
  }

export default Home