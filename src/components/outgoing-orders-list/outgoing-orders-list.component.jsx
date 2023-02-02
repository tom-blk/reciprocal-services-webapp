import OutgoingOrderCard from "../outgoing-order-card/outgoing-order-card.component";

const OutgoingOrdersList = ({ orders }) => {

    return(
        <div className="card-list">
            {
                orders.length>0 
                ?
                orders.map((order) => {
                    return(
                            <OutgoingOrderCard key={order.id} order={order}/>
                        ) 
                    } 
                )
                :
                <div className="text">No orders currently pending...</div>
            }
        </div>
    )
}

export default OutgoingOrdersList