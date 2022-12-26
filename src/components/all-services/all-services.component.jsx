import ServiceCard from "../service-card/service-card.component"

const AllServices = ({ services }) => {
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

export default AllServices