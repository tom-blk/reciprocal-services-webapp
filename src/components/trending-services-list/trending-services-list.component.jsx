import { services } from "../../datamodels/services/services-examples"
import ServiceCard from "../service-card/service-card.component"

const TrendingServicesList = () => {

    const servicesWithDescendingWeeklyOrders = services.sort(function(a, b){return b.weeklyOrderCount - a.weeklyOrderCount});

    const servicesWithMostWeeklyOrders = servicesWithDescendingWeeklyOrders.slice(0,3);

    return(
        <div className="card-list">
        {
            servicesWithMostWeeklyOrders.map((service) => {
                return(
                    <ServiceCard
                        key={service.id}
                        service={service}
                        icon={service.icon}
                    />
                )
            })
        }
        </div>
    )
}

export default TrendingServicesList