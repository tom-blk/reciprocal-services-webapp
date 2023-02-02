import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import TransactionsList from "../../components/transactions-list/transactions-list.component";
import PageContainer from "../../utils/page-container/page-container.component";

import { getIncomingOrders, getIncomingPendingOrders, getIncomingCompletedOrders } from "../../api/transactions/get-incoming-orders";

const IncomingOrders = () => {

    const { testUser } = useContext(UserContext);
    const { displayError } = useContext(AlertMessageContext);

    const [incomingOrders, setIncomingOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
        getIncomingOrders(testUser.id, displayError).then(response => setIncomingOrders(response))
        getIncomingPendingOrders(testUser.id, displayError).then(response => setPendingOrders(response))
        getIncomingCompletedOrders(testUser.id, displayError).then(response => setCompletedOrders(response))
    }, [])

    return(
        <PageContainer>
            <div>Incoming Orders</div>
            <TransactionsList completed={false} transactions={incomingOrders}/>
            <div>Pending Orders</div>
            <TransactionsList completed={false} transactions={pendingOrders}/>
            <div>Completed Orders</div>
            <TransactionsList completed={true} transactions={completedOrders}/>
        </PageContainer>
    )
}

export default IncomingOrders