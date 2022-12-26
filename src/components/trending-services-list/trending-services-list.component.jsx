import { services } from "../../datamodels/services/services-examples"
import ServiceCard from "../service-card/service-card.component"

const TrendingServicesList = () => {

    const servicesWithDescendingWeeklyOrders = services.sort(function(a, b){return b.weeklyOrderCount - a.weeklyOrderCount});

    console.log(servicesWithDescendingWeeklyOrders);

    const servicesWithMostWeeklyOrders = servicesWithDescendingWeeklyOrders.slice(0,3);

    return(
        <div>
        {
            servicesWithMostWeeklyOrders.map((service) => {
                return(
                    <ServiceCard
                        key={service.id} 
                        title={service.name} 
                        description={service.description}
                    />
                )
            })
        }
        </div>
    )
}

export default TrendingServicesList