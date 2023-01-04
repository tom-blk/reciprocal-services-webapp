import { Link, useNavigate } from "react-router-dom"
import ServiceCard from "../service-card/service-card.component"

import "./service-list.styles.scss";

const ServiceList = ({ services }) => {

    const navigate = useNavigate();

    return(
        <div className="card-list">
        {
            services.map((service) => {
                return(
                    <div key={service.id} onClick={e => navigate(`${service.id}`)}>
                        <ServiceCard
                            title={service.name} 
                            description={service.description}
                            icon={service.icon}
                            orderButtonExists={false}
                        />
                    </div>
                )
            })
        }
        </div>
    )
}

export default ServiceList