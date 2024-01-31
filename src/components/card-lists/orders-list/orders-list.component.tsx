import { Order } from "../../../types/orders";
import OrderCard from "../../cards/order/order-card.component";

const OrdersList = ({ orders }: {orders: Order[]}) => {

    return(
        <div className="card-list">
            {
                orders && orders.length > 0
                ?
                orders.map((order) => {
                    return(
                            <OrderCard key={order.id} order={order}/>
                        ) 
                    } 
                )
                :
                <div className="text">No orders here...</div>
            }
        </div>
    )
}

export default OrdersList