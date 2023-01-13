import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router"
import { members } from "../../datamodels/members/members-examples";
import { services } from "../../datamodels/services/services-examples";
import RoundImageContainer from "../profile-avatar/round-image-container.component";
import ServiceCard from "../service-card/service-card.component";

import './provider-profile-page.styles.scss';

const ProviderProfilePage = () => {

    const { providerId } = useParams();

    const [user, setUser] = useState();
    const [currentProviderServices, setCurrentProviderServices] = useState([]);

    useEffect(() => {
        getFullUserDetails();
        getCurrentProviderServices();
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
            console.log(error)
        })
    }

    const getCurrentProviderServices = () => {
        axios.post(`http://localhost:5000/get-user-specific-services/${providerId}`, {
            userId: providerId
        })
        .then(response => {
            setCurrentProviderServices(response.data)
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    

    const providerIdInt = parseInt(providerId);
    
    const currentProvider = members.find(provider => provider.id === providerIdInt)

    return(
        <Fragment>
            {
                user !== undefined
                ?
                <div className="page-container">
                    <div className="povider-profile-heading-container">
                        <RoundImageContainer picture={user.profilePicture} size={'page'}/>
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
                            currentProviderServices.length > 0
                            ?
                            currentProviderServices.map((service) => {
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