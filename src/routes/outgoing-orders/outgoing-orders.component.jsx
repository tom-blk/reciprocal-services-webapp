import PageContainer from "../../utils/page-container/page-container.component";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";
import OrdersList from "../../components/orders-list/orders-list.component";
import { OrderContext } from "../../context/order.context";

const OutgoingOrders = () => {

    const { getAndSetAllOrdersWithSpecificDirection, outgoingOrders } = useContext(OrderContext)
    const { testUser } = useContext(UserContext);
    const { displayError } = useContext(AlertMessageContext);


    useEffect(() => {
        getAndSetAllOrdersWithSpecificDirection(testUser.id, 'outgoing', displayError);
    }, [])


    return(
        <PageContainer>
            <div>Pending Orders</div>
            <OrdersList orders={[...outgoingOrders.new, ...outgoingOrders.accepted, ...outgoingOrders.fulfilled]}/>
            <div>Completed Orders</div>
            <OrdersList orders={[...outgoingOrders.completed, ...outgoingOrders.denied]}/>
        </PageContainer>
    )
}

export default OutgoingOrders