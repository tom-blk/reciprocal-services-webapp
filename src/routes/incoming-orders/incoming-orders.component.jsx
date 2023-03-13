import { useContext, useEffect } from "react";

import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";
import { OrderContext } from "../../context/order.context";

import OrdersList from "../../components/orders-list/orders-list.component";
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
            <OrdersList orders={[...incomingOrders.new]}/>
            <div>Pending Orders</div>
            <OrdersList orders={[...incomingOrders.accepted, ...incomingOrders.fulfilled]}/>
            <div>Completed Orders</div>
            <OrdersList orders={[...incomingOrders.completed, ...incomingOrders.denied]}/>
        </PageContainer>
    )
}

export default IncomingOrders