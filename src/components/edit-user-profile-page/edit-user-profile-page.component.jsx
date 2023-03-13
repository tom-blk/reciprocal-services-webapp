import { Fragment, useContext, useEffect, useState } from "react";

import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/round-image-container/round-image-container.component";

import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import { getFullUser } from "../../api/users/get-single-user";
import { getUserSpecificServices } from "../../api/services/get-user-specific-services";
import MaxSizeContainer from "../../utils/max-size-container/max-size-container.component";
import CloseButton from "../close-button/close-button.component";

const EditUserProfile = () => {

    const { testUser } = useContext(UserContext);
    const { displayError } = useContext(AlertMessageContext)

    const [user, setUser] = useState(undefined);
    const [userServices, setUserServices] = useState(undefined);

    useEffect(() => {
        getFullUser(testUser.id, displayError).then(response => setUser(response));
        getUserSpecificServices(testUser.id, displayError).then(response => setUserServices(response));
    }, [])

    const removeService = (serviceId) => {
        setUserServices(userServices.filter(service => {
            return service.id != serviceId;
        }))
    }

    return(
        <MaxSizeContainer>
            <PageContainer>
                {
                    user
                    ?
                    <Fragment>
                        <h2>Profile Picture</h2>
                        <RoundImageContainer size="page" picture={user.profilePicture}/>
                        <h2>First Name</h2>
                        <input type="text" value={user.firstName} onChange={e => {setUser({...user, firstName: e.target.value})}}/>
                        <h2>Last Name</h2>
                        <input type="text" value={user.lastName} onChange={e => {setUser({...user, lastName: e.target.value})}}/>
                        <h2>Description</h2>
                        <input type="text" value={user.description} onChange={e => {setUser({...user, description: e.target.value})}}/>
                        <h2>Services</h2>  
                        {
                            userServices &&
                            userServices.map((service) => {
                                return(
                                    <span><div key={service.id}>{service.name}</div><CloseButton onClickHandler={removeService}/></span>
                                )
                            })
                        }
                    </Fragment>
                    :
                    <span>Something went wrong...</span>
                }
            </PageContainer>
        </MaxSizeContainer>
    )
}

export default EditUserProfile