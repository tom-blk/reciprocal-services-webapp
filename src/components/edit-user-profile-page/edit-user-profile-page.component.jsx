import { useState } from "react";
import { members } from "../../datamodels/members/members-examples"
import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/round-image-container/round-image-container.component";

const EditUserProfile = () => {

    const testUser = members[1];

    const [firstName, setFirstName] = useState(testUser.firstName);
    const [lastName, setLastName] = useState(testUser.lastName);

    const [description, setDescription] = useState(testUser.description);

    return(
        <PageContainer>
            <div className="povider-profile-heading-container">
                <RoundImageContainer size="page" picture={testUser.profilePicture}/>
                <div>
                    <div className="heading-primary">{`${testUser.firstName} ${testUser.lastName}`}</div>
                    <div className="sub-text">{`@${testUser.userName}`}</div>
                </div>
            </div>
            <input type="text" onChange={e => {setFirstName(e.target.value)}}/>
            <input type="text" onChange={e => {setLastName(e.target.value)}}/>
            <input type="text" onChange={e => {setDescription(e.target.value)}}/>
        </PageContainer>
    )
}

export default EditUserProfile