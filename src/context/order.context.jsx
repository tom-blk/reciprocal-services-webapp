import React, { createContext, useState, useContext, useEffect } from "react";

import { AlertMessageContext } from "./alert-message.context";

import {/*  getAllOrdersWithSpecificDirection, */ getOrdersWithSpecificStatusAndDirection } from "../api/orders/read";
import { UserContext } from "./user.context";

export const OrderContext = createContext();

export const OrderContextProvider = (input) => {

    const { displayError } = useContext(AlertMessageContext);
    const { user } = useContext(UserContext);

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
        
        /* const getAndSetAllOrdersWithSpecificDirection = (userId, orderDirection, onErrorFunction) => {
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
        } */
    
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
                            setOutgoingOrders(o => ({...o, [orderStatus]: response}))
                        }
                        if(orderDirection === 'incoming'){
                            setIncomingOrders(i => ({...i, [orderStatus]: response}))
                        }
                    }
                )
                .catch(error => displayError(error))
        }

        console.log('effect')
        if(user){
            getAndSetOrderWithSpecificStatusAndDirection(user.id, 'incoming', 'new', displayError);
            getAndSetOrderWithSpecificStatusAndDirection(user.id, 'outgoing', 'fulfilled', displayError);
        }
    }, [user, displayError])

    const value = {
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