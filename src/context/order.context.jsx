import React, { createContext, useState, useContext } from "react";

import { AlertMessageContext } from "./alert-message.context";

import { getAllOrdersWithSpecificDirection, getOrdersWithSpecificStatusAndDirection } from "../api/orders/read";

export const OrderContext = createContext();

export const OrderContextProvider = (input) => {

    const { displayError } = useContext(AlertMessageContext);

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

    const getAndSetAllOrdersWithSpecificDirection = (userId, orderDirection, onErrorFunction) => {
        getAllOrdersWithSpecificDirection(userId, orderDirection, onErrorFunction)
            .then(
                response => {
                    if(orderDirection === 'outgoing'){
                        setOutgoingOrders(response)
                    }
                    if(orderDirection === 'incoming'){
                        setIncomingOrders(response)
                    }
                }
            )
            .catch(error => displayError(error))
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
            default:
                statusInt = 5;
        }

        getOrdersWithSpecificStatusAndDirection(userId, statusInt, orderDirection, onErrorFunction)
            .then(
                response => {
                    console.log(response);
                    if(orderDirection === 'outgoing'){
                        setOutgoingOrders({...outgoingOrders, [orderStatus]: response})
                    }
                    if(orderDirection === 'incoming'){
                        setIncomingOrders({...incomingOrders, [orderStatus]: response})
                    }
                }
            )
            .catch(error => displayError(error))
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