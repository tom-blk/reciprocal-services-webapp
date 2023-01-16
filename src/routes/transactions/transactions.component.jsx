import TransactionsList from "../../components/transactions-list/transactions-list.component";
import PageContainer from "../../utils/page-container/page-container.component";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/app-context";

const Transactions = () => {

    const appContext = useContext(AppContext);

    const a = axios;

    const [openTransactions, setOpenTransactions] = useState([]);
    const [completedTransactions, setCompletedTransactions] = useState([]);

    useEffect(() => {
        getOpenTransactions();
    }, [])

    const getOpenTransactions = () => {
        a.post(`http://localhost:5000/get-user-specific-open-transactions/${appContext.testUser.id}`, {
            userId: appContext.testUser.id
        })
        .then(response => {
            setOpenTransactions(response.data)
            console.log(response.data)
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
            <TransactionsList completed={true} transactions={openTransactions}/>
        </PageContainer>
    )
}

export default Transactions