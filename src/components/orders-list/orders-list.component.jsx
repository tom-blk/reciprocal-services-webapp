import OrderCard from "../order-card/order-card.component";

const OrdersList = ({ orders }) => {

    return(
        <div className="card-list">
            {
                orders
                ?
                orders.map((order) => {
                    return(
                            <OrderCard key={order.id} order={order}/>
                        ) 
                    } 
                )
                :
                <div className="text">No orders currently pending...</div>
            }
        </div>
    )
}

export default OrdersList