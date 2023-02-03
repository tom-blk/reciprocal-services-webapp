import PageContainer from "../../utils/page-container/page-container.component";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";
import OutgoingOrdersList from "../../components/outgoing-orders-list/outgoing-orders-list.component";

const OutgoingOrders = () => {

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
            <div>Pending Orders</div>
            <OutgoingOrdersList completed={false} orders={openTransactions}/>
            <div>Completed Orders</div>
            <OutgoingOrdersList completed={true} orders={completedTransactions}/>
        </PageContainer>
    )
}

export default OutgoingOrders