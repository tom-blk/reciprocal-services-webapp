import PageContainer from "../../utils/page-container/page-container.component";
import { useContext } from "react";
import OrdersList from "../../components/card-lists/orders-list/orders-list.component";
import { OrderContext } from "../../context/order.context";

const OutgoingOrders = () => {

    const { outgoingOrders } = useContext(OrderContext)

    return(
        <PageContainer>
            <h1>Outgoing Orders</h1>
            <div>Pending Orders</div>
            <OrdersList orders={[...outgoingOrders.new, ...outgoingOrders.accepted, ...outgoingOrders.fulfilled]}/>
            <div>Completed Orders</div>
            <OrdersList orders={[...outgoingOrders.completed, ...outgoingOrders.denied]}/>
        </PageContainer>
    )
}

export default OutgoingOrders