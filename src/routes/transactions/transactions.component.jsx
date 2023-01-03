import { Fragment } from "react";
import TransactionsList from "../../components/transactions-list/transactions-list.component";

const Transactions = () => {

    return(
        <Fragment>
            <div>Pending Transactions</div>
            <TransactionsList completed={false}/>
            <div>Completed Transactions</div>
            <TransactionsList completed={true}/>
        </Fragment>
    )
}

export default Transactions