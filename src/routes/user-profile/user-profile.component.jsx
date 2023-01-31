import { Fragment, useContext, useEffect, useState } from "react";
import ServiceCard from "../../components/service-card/service-card.component";
import TransactionCard from "../../components/transaction-card/transaction-card.component";
import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/round-image-container/round-image-container.component";
import EditButton from "../../components/edit-button/edit-button.component";
import { useNavigate } from "react-router";
import axios from "axios";
import { UserContext } from "../../context/user.context";
import { AlertMessageContext } from "../../context/alert-message.context";

const UserProfile = () => {

    const userContext = useContext(UserContext);
    const { displayError } = useContext(AlertMessageContext);

    const {id} = userContext.testUser;

    const [user, setUser] = useState(undefined);
    const [userServices, setUserServices] = useState([]);
    const [activeUserTransactions, setActiveUserTransactions] = useState([]);

    const a = axios

    const navigate = useNavigate()

    useEffect(() => {
        getUser();
    }, [])

    useEffect(() => {

    }, [user])

    const getUser = () => {
        a.post(`http://localhost:5000/get-single-user/${id}`, {
            userId: id
        })
        .then(response => {
            setUser(response.data)
        })
        .then(() => {
            getUserServices();
            getUserTransactions();
        })
        .catch(error => {
            displayError(error)
        })
    }

    const getUserTransactions = () => {
        a.post(`http://localhost:5000/get-user-specific-open-transactions/${id}`, {
            userId: id
        })
        .then(response => {
            setActiveUserTransactions(response.data)
        })
        .catch(error => {
            displayError(error)
        })
    }

    const getUserServices = () => {
        a.post(`http://localhost:5000/get-user-specific-services/${id}`, {
            userId: id
        })
        .then(response => {
            setUserServices(response.data)
        })
        .catch(error => {
            displayError(error)
        })
    }

    const navigateToUserEditProfile = () => {
        navigate('/userProfile-edit')
    }

    return(
            <PageContainer>
                {
                    user
                    ?
                    <Fragment>
                    <div className="povider-profile-heading-container">
                        <RoundImageContainer size="page" picture={user.profilePicture}/>
                        <div>
                            <div className="heading-primary">{`${user.firstName} ${user.lastName}`}</div>
                            <div className="sub-text">{`@${user.userName}`}</div>
                        </div>
                    </div>
                    <div>Location + Radius/Mobile/Stationary</div>
                    <div className="heading-secondary">Providable Services</div>
                    <div className="card-list">
                    {
                        userServices.map((service) => {
                            return(
                                    <ServiceCard
                                        key={service.id}
                                        service={service}
                                        orderButtonExists={false}
                                    />
                                ) 
                            } 
                        )
                    }
                    </div>
                    <div>{user.profileDescription}</div>
                    <div className="heading-secondary">Active Services</div>
                    {
                        activeUserTransactions.map(transaction => {
                            return(
                                <TransactionCard key={transaction.id} transaction={transaction}/>
                            )
                        })
                    }
                    <EditButton navigate={navigateToUserEditProfile} size="50px"/>
                    </Fragment>
                    :
                    <div className="text">Sorry, this user is not available...</div>
                }
                
            </PageContainer>
    )
}

export default UserProfile