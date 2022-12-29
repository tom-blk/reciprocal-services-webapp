import { Fragment } from "react";
import { useParams } from "react-router"
import { services } from "../../datamodels/services/services-examples";

const ServicePage = () => {

    let { serviceId } = useParams(); 

    const serviceIdInt = parseInt(serviceId);
    
    const currentService = services.find(service => service.id === serviceIdInt)

    return(
        <Fragment>
            {
                currentService != undefined
                ?
                <div>
                    <div className="service-icon" style={{backgroundColor: "blue", height: "50px", width: "50px"}}></div>
                    <div>{currentService.id + " " + currentService.name}</div>
                </div>
                :
                <div>Sorry, but there is nothing here...</div>
            }
        </Fragment>
    )
}

export default ServicePage