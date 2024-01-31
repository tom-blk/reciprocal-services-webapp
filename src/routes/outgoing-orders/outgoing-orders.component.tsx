import React from "react";

import useFetchOrders from "../../hooks/useFetchOrders";

import PageContainer from "../../utils/page-container/page-container.component";
import OrdersList from "../../components/card-lists/orders-list/orders-list.component";

const OutgoingOrders = () => {

    const outgoingOrders = useFetchOrders('outgoing');

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