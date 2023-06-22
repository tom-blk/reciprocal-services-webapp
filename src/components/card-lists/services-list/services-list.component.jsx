import ServiceCard from "../../cards/service/service-card.component"

const ServicesList = ({ services }) => {

    return(
        <div className="card-list">
        {
            services&&
            services.length > 0 
            ?
            services.map((service) => {
                return(
                    <ServiceCard
                        key={service.id}
                        service={service}
                        orderButtonExists={false}
                    />
                )
            })
            :
            <span>No services here...</span>
        }
        </div>
    )
}

export default ServicesList