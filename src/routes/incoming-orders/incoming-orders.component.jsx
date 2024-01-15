import { useContext } from "react";

import { OrderContext } from "../../context/order.context";

import OrdersList from "../../components/card-lists/orders-list/orders-list.component";
import PageContainer from "../../utils/page-container/page-container.component";

const IncomingOrders = () => {

    const { incomingOrders } = useContext(OrderContext);

    return(
        <PageContainer>
            <h1>Incoming Orders</h1>
            <div>New Orders</div>
            <OrdersList orders={[...incomingOrders.new]}/>
            <div>Pending Orders</div>
            <OrdersList orders={[...incomingOrders.accepted, ...incomingOrders.fulfilled]}/>
            <div>Completed Orders</div>
            <OrdersList orders={[...incomingOrders.completed, ...incomingOrders.denied]}/>
        </PageContainer>
    )
}

export default IncomingOrders