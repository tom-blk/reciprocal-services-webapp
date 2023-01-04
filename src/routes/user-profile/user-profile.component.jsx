import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { members } from "../../datamodels/members/members-examples"
import { services } from "../../datamodels/services/services-examples";
import ServiceCard from "../../components/service-card/service-card.component";
import { transactions } from "../../datamodels/transactions/transactions-examples";
import TransactionCard from "../../components/transaction-card/transaction-card.component";
import ProfileAvatar from "../../components/profile-avatar/profile-avatar.component";
import PageContainer from "../../utils/page-container/page-container.component";

const UserProfile = () => {

    const testUser = members[1];

    const [userServices, setUserServices] = useState([])

    const [activeUserTransactions, setActiveUserTransactions] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        setUserServices(
            services.filter(
                service => {return(testUser.providableServices.includes(service.id))}
            )
        )
        setActiveUserTransactions(
            transactions.filter(
                transaction => {return(testUser.id === transaction.providingUserId)}
            )
        )
    }, [])

    return(
        <PageContainer>
            <div className="povider-profile-heading-container">
                <ProfileAvatar size="page" picture={testUser.profilePicture}/>
                <div>
                    <h3>{`${testUser.firstName} ${testUser.lastName}`}</h3>
                    <div className="user-name">{`@${testUser.userName}`}</div>
                </div>
            </div>
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
            <h3>Active Services</h3>
            {
                activeUserTransactions.map(transaction => {
                    return(
                        <TransactionCard transaction={transaction}/>
                    )
                })
            }
        </PageContainer>
    )
}

export default UserProfile