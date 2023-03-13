import React, { createContext, useEffect, useState } from "react";
import { getAllOrdersWithSpecificDirection, getOrdersWithSpecificStatusAndDirection } from "../api/orders/get-orders";

export const OrderContext = createContext();

export const OrderContextProvider = (input) => {

    //ORDER STATUS IS 1 (ordered) 2 (accepted) 3 (completed) 4 (completion confirmed) 5 (order denied)

    const ordersTemplate = {
        new: [],
        accepted: [],
        fulfilled: [],
        completed: [],
        denied: []
    }

    const [outgoingOrders, setOutgoingOrders] = useState(ordersTemplate);
    const [incomingOrders, setIncomingOrders] = useState(ordersTemplate);

    useEffect(() => {
        console.log(outgoingOrders.denied);
    }, [outgoingOrders])

    useEffect(() => {
        console.log(incomingOrders.denied);
    }, [incomingOrders])

    const getAndSetAllOrdersWithSpecificDirection = (userId, orderDirection, onErrorFunction) => {
        getAllOrdersWithSpecificDirection(userId, orderDirection, onErrorFunction).then(
            response => {
                if(orderDirection === 'outgoing'){
                    setOutgoingOrders(response)
                }
                if(orderDirection === 'incoming'){
                    setIncomingOrders(response)
                }
            }
        )
    }

    const getAndSetOrderWithSpecificStatusAndDirection = (userId, orderDirection, orderStatus, onErrorFunction) => {

        let statusInt = undefined;

        switch(orderStatus){
            case 'new':
                statusInt = 1;
                break;
            case 'accepted':
                statusInt = 2;
                break;
            case 'fulfilled':
                statusInt = 3;
                break;
            case 'completed':
                statusInt = 4;
                break;
            case 'denied':
                statusInt = 5;
                break;
        }

        getOrdersWithSpecificStatusAndDirection(userId, statusInt, orderDirection, onErrorFunction).then(
            response => {
                console.log(response);
                if(orderDirection === 'outgoing'){
                    setOutgoingOrders({...outgoingOrders, [orderStatus]: response})
                }
                if(orderDirection === 'incoming'){
                    setIncomingOrders({...incomingOrders, [orderStatus]: response})
                }
            }
        );
    }



    const value = {
        getAndSetAllOrdersWithSpecificDirection,
        getAndSetOrderWithSpecificStatusAndDirection,
        outgoingOrders,
        incomingOrders
    }

    return (
        <OrderContext.Provider value={value}>
            {input.children}
        </OrderContext.Provider>
    );
}

export default OrderContextProvider;