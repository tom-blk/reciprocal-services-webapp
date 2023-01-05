import ServiceCard from "../service-card/service-card.component"

import "./service-list.styles.scss";

const ServiceList = ({ services }) => {

    return(
        <div className="card-list">
        {
            services.map((service) => {
                return(
                    <ServiceCard
                        key={service.id}
                        service={service}
                        orderButtonExists={false}
                    />
                )
            })
        }
        </div>
    )
}

export default ServiceList