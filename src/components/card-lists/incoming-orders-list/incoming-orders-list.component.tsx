import { Order } from "../../../types/orders";
import OrderCard from "../../cards/order/order-card.component";

import '../card-list.styles.scss';

const IncomingOrdersList = ({ orders }: {orders: Order[]}) => {

    return(
        <div className="card-list">
            {
                orders
                ?
                orders.map((order: Order) => {
                    return(
                            <OrderCard key={order.id} order={order}/>
                        ) 
                    } 
                )
                :
                <div className="text">No Orders here...</div>
            }
        </div>
    )
}

export default IncomingOrdersList