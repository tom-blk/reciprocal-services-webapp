import TransactionsList from "../../components/transactions-list/transactions-list.component";
import PageContainer from "../../utils/page-container/page-container.component";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

const Transactions = () => {

    const userContext = useContext(UserContext);
    const { displayError } = useContext(AlertMessageContext);

    const [openTransactions, setOpenTransactions] = useState([]);
    const [completedTransactions, setCompletedTransactions] = useState([]);

    useEffect(() => {
        getUserSpecificOpenTransactions();
        getUserSpecificCompletedTransactions();
    }, [])

    const getUserSpecificOpenTransactions = () => {
        axios.post(`http://localhost:5000/get-user-specific-open-transactions/${userContext.testUser.id}`, {
            userId: userContext.testUser.id
        })
        .then(response => {
            setOpenTransactions(response.data)
        })
        .catch(error => {
            displayError(error)
        })
    }

    const getUserSpecificCompletedTransactions = () => {
        axios.post(`http://localhost:5000/get-user-specific-completed-transactions/${userContext.testUser.id}`, {
            userId: userContext.testUser.id
        })
        .then(response => {
            setCompletedTransactions(response.data)
        })
        .catch(error => {
            displayError(error)
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