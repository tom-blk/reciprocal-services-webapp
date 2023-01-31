import axios from "axios";
import { useContext } from "react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router"
import { AlertMessageContext } from "../../context/alert-message.context";
import RoundImageContainer from "../round-image-container/round-image-container.component";
import ServiceCard from "../service-card/service-card.component";

import './provider-profile-page.styles.scss';

const ProviderProfilePage = () => {

    const alertMessageContext = useContext(AlertMessageContext);
    const {displayError} = alertMessageContext;

    const { providerId } = useParams();

    const [user, setUser] = useState(undefined);
    const [providerServices, setProviderServices] = useState([]);

    useEffect(() => {
        getFullUserDetails();
        getProviderServices();
    }, [])

    const getFullUserDetails = () => {
        axios.post(`http://localhost:5000/get-full-user-details/${providerId}`, {
            userId: providerId
        })
        .then(response => {
            setUser(response.data)
            console.log(response.data)
        })
        .catch(error => {
            displayError(error.message)
        })
    }

    const getProviderServices = () => {
        axios.post(`http://localhost:5000/get-user-specific-services/${providerId}`, {
            userId: providerId
        })
        .then(response => {
            setProviderServices(response.data)
            console.log(response.data)
        })
        .catch(error => {
            displayError(error.message)
        })
    }

    return(
        <Fragment>
            {
                user !== undefined
                ?
                <div className="page-container">
                    <div className="povider-profile-heading-container">
                        <RoundImageContainer picture={user.profilePicture} serviceOrUser={'user'} size={'page'}/>
                        <div>
                            <h3>{user.firstName + " " + user.lastName}</h3>
                            <div className="user-name">{'@' + user.userName}</div>
                        </div> 
                    </div>
                    <div className="provider-profile-body-container">
                        <div>Location + Radius/Mobile/Stationary</div>
                        <div>{user.profileDescription}</div>
                        <h3>Skills</h3>
                        {
                            providerServices.length > 0
                            ?
                            providerServices.map((service) => {
                                    return(
                                        <ServiceCard
                                            key={service.id}
                                            service={service}
                                            orderButtonExists={true}
                                        />
                                    )
                            })
                            :
                            <div className="text">This provider is not currently offering any services</div>
                        }
                    </div>
                    
                </div>
                :
                <div>Sorry, but there is nothing here...</div>
            }
        </Fragment>
        
    )
}

export default ProviderProfilePage