import { Link } from "react-router-dom"
import ServiceCard from "../service-card/service-card.component"

import "./service-list.styles.scss";

const ServiceList = ({ services }) => {
    return(
        <div className="service-list-container">
        {
            services.map((service) => {
                return(
                    <Link key={service.id} to={`${service.id}`}>
                        <ServiceCard
                            title={service.name} 
                            description={service.description}
                        />
                    </Link>
                )
            })
        }
        </div>
    )
}

export default ServiceList