import { Fragment } from "react";
import { useParams } from "react-router"
import { members } from "../../datamodels/members/members-examples";
import { services } from "../../datamodels/services/services-examples";
import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../profile-avatar/round-image-container.component";
import ProviderCard from "../provider-card/provider-card.component";

const ServicePage = () => {

    let { serviceId } = useParams(); 

    const serviceIdInt = parseInt(serviceId);
    
    const currentService = services.find(service => service.id === serviceIdInt)

    const serviceProviders = members.filter(member => {return(member.providableServices.includes(currentService.id))})

    return(
        <Fragment>
            {
                currentService !== undefined
                ?
                <PageContainer>
                    <div className="transaction-page-heading">
                        <RoundImageContainer picture={currentService.icon} size={'page'}/>
                        <div className="heading-primary">{currentService.name}</div>
                    </div>
                    <div className="heading-secondary">{`Credits per Hour: ${currentService.creditsPerHour}`}</div>
                    <div className="text">{currentService.description}</div>
                    <div className="heading-secondary">Providers:</div>
                    {
                        serviceProviders.map(provider => {
                            return(
                                <ProviderCard orderButtonExists={true} key={provider.id} provider={provider}/>
                            )
                        })
                    }
                </PageContainer>
                :
                <div>Sorry, but there is nothing here...</div>
            }
        </Fragment>
    )
}

export default ServicePage