import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { members } from "../../datamodels/members/members-examples"
import { services } from "../../datamodels/services/services-examples";
import ServiceCard from "../../components/service-card/service-card.component";

const UserProfile = () => {

    const testUser = members[1];

    const [userServices, setUserServices] = useState([])

    const navigate = useNavigate();

    const renderProfilePic = () => {
        if(!testUser.profilePicture){
            return "https://www.svgrepo.com/download/390671/profile-user-avatar-man-person.svg";
        } else {
            return testUser.profilePicture;
        }
    }

    useEffect(() => {
        setUserServices(
            services.filter(
                service => {return(testUser.providableServices.includes(service.id))}
            ))
    }, [])

    return(
        <div>
            <img className="image-icon" src={renderProfilePic()}/>
            <h3>{`${testUser.firstName} ${testUser.lastName}`}</h3>
            <div>{`@${testUser.userName}`}</div>
            <div>Location + Radius/Mobile/Stationary</div>
            <div>Providable Services:</div>
            <div className="card-list">
            {
                userServices.map((service) => {
                    return(
                            <div key={service.id} onClick={e => navigate(`/services/${service.id}`)}>
                            <ServiceCard
                                title={service.name} 
                                description={service.description}
                                icon={service.icon}
                                orderButtonExists={false}
                            />
                            </div>
                        ) 
                    } 
                )
            }
            </div>
            <div>{testUser.profileDescription}</div>
        </div>
    )
}

export default UserProfile