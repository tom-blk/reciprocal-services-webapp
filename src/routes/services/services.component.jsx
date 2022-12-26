import SearchBar from "../../components/search-bar/search-bar.component"
import { services } from "../../datamodels/services/services-examples"
import ServiceCard from "../../components/service-card/service-card.component"

const Services = () => {
    return(
        <div className="services-container">
            <SearchBar services={services}/>
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

export default Services