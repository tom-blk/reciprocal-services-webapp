import { Link } from "react-router-dom";
import { services } from "../../datamodels/services/services-examples"
import ServiceCard from "../service-card/service-card.component"

import "./trending-services-list.styles.scss"

const TrendingServicesList = () => {

    const servicesWithDescendingWeeklyOrders = services.sort(function(a, b){return b.weeklyOrderCount - a.weeklyOrderCount});

    const servicesWithMostWeeklyOrders = servicesWithDescendingWeeklyOrders.slice(0,3);

    return(
        <div className="trending-services-list-container">
        {
            servicesWithMostWeeklyOrders.map((service) => {
                return(
                    <Link key={service.id} to={`/services/${service.id}`}>
                        <ServiceCard
                            title={service.name} 
                            description={service.description}
                            icon={service.icon}
                        />
                    </Link>
                )
            })
        }
        </div>
    )
}

export default TrendingServicesList