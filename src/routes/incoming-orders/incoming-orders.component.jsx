import { useContext, useEffect } from "react";

import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";
import { OrderContext } from "../../context/order.context";

import IncomingOrdersList from "../../components/incoming-orders-list/incoming-orders-list.component";
import PageContainer from "../../utils/page-container/page-container.component";

const IncomingOrders = () => {

    const { testUser } = useContext(UserContext);
    const { displayError } = useContext(AlertMessageContext);
    const { getAndSetAllOrdersWithSpecificDirection, incomingOrders } = useContext(OrderContext);

    useEffect(() => {
        getAndSetAllOrdersWithSpecificDirection(testUser.id, 'incoming', displayError);
    }, [])

    return(
        <PageContainer>
            <div>Incoming Orders</div>
            <IncomingOrdersList completed={false} orders={[...incomingOrders.new]}/>
            <div>Pending Orders</div>
            <IncomingOrdersList completed={false} orders={[...incomingOrders.accepted, ...incomingOrders.fulfilled]}/>
            <div>Completed Orders</div>
            <IncomingOrdersList completed={true} orders={[...incomingOrders.completed, ...incomingOrders.denied]}/>
        </PageContainer>
    )
}

export default IncomingOrders