import React, {useState, useContext, useEffect } from "react"
import { getAllOrdersWithSpecificDirection } from "../api/orders/read"
import { UserContext } from "../context/user.context"
import { toast } from "react-toastify"
import AlertMessageComponent from '../components/alerts/alert-message.component'
import { errorMessageOptions } from "../components/alerts/alertMessageTypes"
import { SortedOrders } from "../types/orders"

const useFetchOrders = (direction: 'incoming'|'outgoing'): SortedOrders => {

    const { user } = useContext(UserContext);

    const sortedOrderTemplate = {
        new: [],
        accepted: [],
        fulfilled: [],
        completed: [],
        denied: []
    }

    const [orders, setOrders] = useState<SortedOrders>(sortedOrderTemplate)

    useEffect(() => {
        const getAndSetAllOrdersWithSpecificDirection = (userId: number, orderDirection: 'incoming' | 'outgoing') => {
            getAllOrdersWithSpecificDirection(userId, orderDirection)
                .then(
                    response => {
                        if(orderDirection === 'outgoing'){
                            setOrders(response)
                        }
                        if(orderDirection === 'incoming'){
                            setOrders(response)
                        }
                    }
                )
                .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions)})
        }

        getAndSetAllOrdersWithSpecificDirection(user!.id, direction)
    }, [user, direction])

    return orders
}

export default useFetchOrders