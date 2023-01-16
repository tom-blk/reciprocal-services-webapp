import TransactionsList from "../../components/transactions-list/transactions-list.component";
import PageContainer from "../../utils/page-container/page-container.component";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/app-context";

const Transactions = () => {

    const appContext = useContext(AppContext);

    const [openTransactions, setOpenTransactions] = useState([]);
    const [completedTransactions, setCompletedTransactions] = useState([]);

    useEffect(() => {
        getUserSpecificOpenTransactions();
        getUserSpecificCompletedTransactions();
    }, [])

    const getUserSpecificOpenTransactions = () => {
        axios.post(`http://localhost:5000/get-user-specific-open-transactions/${appContext.testUser.id}`, {
            userId: appContext.testUser.id
        })
        .then(response => {
            setOpenTransactions(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const getUserSpecificCompletedTransactions = () => {
        axios.post(`http://localhost:5000/get-user-specific-completed-transactions/${appContext.testUser.id}`, {
            userId: appContext.testUser.id
        })
        .then(response => {
            setCompletedTransactions(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return(
        <PageContainer>
            <div>Pending Transactions</div>
            <TransactionsList completed={false} transactions={openTransactions}/>
            <div>Completed Transactions</div>
            <TransactionsList completed={true} transactions={completedTransactions}/>
        </PageContainer>
    )
}

export default Transactions