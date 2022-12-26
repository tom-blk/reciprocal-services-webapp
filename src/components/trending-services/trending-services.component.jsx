import { services } from "../../datamodels/services/services-examples"
import ServiceCard from "../service-card/service-card.component"

const TrendingServices = () => {
    return(
        <div>
        {
            services.map((service) => {
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

export default TrendingServices