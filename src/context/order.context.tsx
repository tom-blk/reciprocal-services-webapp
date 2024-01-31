import React, { createContext, useState, useContext, useEffect } from "react";
import { SortedOrders} from "../types/orders";
import { ChildrenProps } from "../types/general";

import { UserContext} from "./user.context";

import { getAllOrdersWithSpecificDirection /*, getOrdersWithSpecificStatusAndDirection */} from "../api/orders/read";
import { toast } from "react-toastify";
import AlertMessageComponent from "../components/alerts/alert-message.component";
import { errorMessageOptions } from "../components/alerts/alertMessageTypes";

export interface OrderContextType{
    outgoingOrders: SortedOrders;
    incomingOrders: SortedOrders;
    setIncomingOrders: (incomingOrders: SortedOrders) => void;
    setOutgoingOrders: (outgoingOrders: SortedOrders) => void;
    refetchOrdersAfterUpdating: (direction: 'incoming' | 'outgoing') => void; 
}

export const OrderContext = createContext<OrderContextType>({} as OrderContextType);

export const OrderContextProvider: React.FC<ChildrenProps> = ({children}) => {

    const { user } = useContext(UserContext);

    //ORDER STATUS IS 1 (ordered) 2 (accepted) 3 (completed) 4 (completion confirmed) 5 (order denied)

    const ordersTemplate:SortedOrders = {
        new: [],
        accepted: [],
        fulfilled: [],
        completed: [],
        denied: []
    }

    const [outgoingOrders, setOutgoingOrders] = useState(ordersTemplate);
    const [incomingOrders, setIncomingOrders] = useState(ordersTemplate);
    const [triggerOrderRefetching, setTriggerOrderRefetching] = useState<{direction: 'incoming'} | {direction: 'outgoing'} | undefined>(undefined)

    const refetchOrdersAfterUpdating = (direction: 'incoming' | 'outgoing') => {
        setTriggerOrderRefetching({direction: direction})
    }

    

    useEffect(() => {
        const getAndSetAllOrdersWithSpecificDirection = (userId: number, orderDirection: 'incoming' | 'outgoing') => {
            getAllOrdersWithSpecificDirection(userId, orderDirection)
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
                .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
        }

        if(user && triggerOrderRefetching){
            getAndSetAllOrdersWithSpecificDirection(user.id, 'incoming')
            getAndSetAllOrdersWithSpecificDirection(user.id, 'outgoing')
        }
    }, [user, triggerOrderRefetching])

    

    /* useEffect(() => {
        
        const getAndSetAllOrdersWithSpecificDirection = (userId: number, orderDirection: string) => {
            getAllOrdersWithSpecificDirection(userId, orderDirection)
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
                .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
        }
    
        const getAndSetOrderWithSpecificStatusAndDirection = (userId: number, orderDirection: string, orderStatus: string) => {
    
            let statusInt: number | undefined = undefined;
    
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
    
            getOrdersWithSpecificStatusAndDirection(userId, statusInt, orderDirection)
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
                .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
        }

        if(user){
            getAndSetOrderWithSpecificStatusAndDirection(user.id, 'incoming', 'new');
            getAndSetOrderWithSpecificStatusAndDirection(user.id, 'outgoing', 'fulfilled');
        }
    }, [user]) */

    const value = {
        outgoingOrders,
        incomingOrders,
        setIncomingOrders,
        setOutgoingOrders,
        refetchOrdersAfterUpdating
    }

    return (
        <OrderContext.Provider value={value}>
            {children}
        </OrderContext.Provider>
    );
}

export default OrderContextProvider;