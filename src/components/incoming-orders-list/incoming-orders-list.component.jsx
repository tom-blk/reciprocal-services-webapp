import IncomingOrderCard from "../incoming-order-card/incoming-order-card.component"

const IncomingOrdersList = ({ orders }) => {

    return(
        <div className="card-list">
            {
                orders
                ?
                orders.map((order) => {
                    return(
                            <IncomingOrderCard key={order.id} order={order}/>
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