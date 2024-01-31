import { MaybeUserSpecificService } from "../../../types/services";
import { Provider } from "../../../types/users";
import ServiceCard from "../../cards/service/service-card.component"
import '../card-list.styles.scss';

interface Props{
    services: MaybeUserSpecificService[];
    providerInfo?: Provider;
}

const ServicesList = ({ services, providerInfo }: Props) => {

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
                        providerInfo={providerInfo}
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