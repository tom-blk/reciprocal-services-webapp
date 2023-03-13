import ServiceCard from "../service-card/service-card.component"

const ServicesList = ({ services }) => {

    return(
        <div className="card-list">
        {
            services &&
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

export default ServicesList