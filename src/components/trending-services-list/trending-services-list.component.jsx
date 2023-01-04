import { useNavigate } from "react-router";
import { services } from "../../datamodels/services/services-examples"
import ServiceCard from "../service-card/service-card.component"

import "./trending-services-list.styles.scss"

const TrendingServicesList = () => {

    const navigate = useNavigate();

    const servicesWithDescendingWeeklyOrders = services.sort(function(a, b){return b.weeklyOrderCount - a.weeklyOrderCount});

    const servicesWithMostWeeklyOrders = servicesWithDescendingWeeklyOrders.slice(0,3);

    return(
        <div className="card-list">
        {
            servicesWithMostWeeklyOrders.map((service) => {
                return(
                    <div key={service.id} onClick={e => navigate(`/services/${service.id}`)}>
                        <ServiceCard
                            title={service.name} 
                            description={service.description}
                            icon={service.icon}
                        />
                    </div>
                )
            })
        }
        </div>
    )
}

export default TrendingServicesList