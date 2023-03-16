import { Fragment, useContext, useEffect, useState } from "react";

import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/round-image-container/round-image-container.component";

import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

import { getFullUser } from "../../api/users/get-single-user";
import { getUserSpecificServices } from "../../api/services/get-user-specific-services";
import MaxSizeContainer from "../../utils/max-size-container/max-size-container.component";
import SelectableServicesList from "../selectable-services-list/selectable-services-list.component";
import { getSuperficialServiceDetails } from "../../api/services/get-all-services";
import ButtonComponent from "../button/button.component";

const EditUserProfile = () => {

    const { testUser } = useContext(UserContext);
    const { displayError } = useContext(AlertMessageContext)

    const [user, setUser] = useState(undefined);
    const [allServices, setAllServices] = useState([]);
    const [userServices, setUserServices] = useState([]);

    useEffect(() => {
        getFullUser(testUser.id, displayError).then(response => setUser(response));
    }, [])

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
                        <SelectableServicesList userId={testUser.id}/>
                        <ButtonComponent buttonType={'confirm'}>Confirm</ButtonComponent>
                        <ButtonComponent buttonType={'cancel'}>Cancel</ButtonComponent>
                    </Fragment>
                    :
                    <span>Something went wrong...</span>
                }
            </PageContainer>
        </MaxSizeContainer>
    )
}

export default EditUserProfile