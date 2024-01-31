import React from "react";

import OrdersList from "../../components/card-lists/orders-list/orders-list.component";
import PageContainer from "../../utils/page-container/page-container.component";
import useFetchOrders from "../../hooks/useFetchOrders";

const IncomingOrders = () => {

    const incomingOrders = useFetchOrders('incoming');

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