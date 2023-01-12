import TransactionsList from "../../components/transactions-list/transactions-list.component";
import PageContainer from "../../utils/page-container/page-container.component";
import axios from "axios";
import { useEffect, useState } from "react";
import { members } from "../../datamodels/members/members-examples";

const Transactions = () => {

    const testUserId = 2;

    const a = axios;

    const [openTransactions, setOpenTransactions] = useState([]);
    const [completedTransactions, setCompletedTransactions] = useState([]);

    useEffect(() => {
        getOpenTransactions();
    }, [])

    const getOpenTransactions = () => {
        a.get(`http://localhost:5000/get-user-specific-open-transactions/${testUserId}`, {
            params: {
                userId: testUserId
            }
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