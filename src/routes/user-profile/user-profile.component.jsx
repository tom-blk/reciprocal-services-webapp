import { useEffect, useState } from "react";
import { members } from "../../datamodels/members/members-examples"
import { services } from "../../datamodels/services/services-examples";
import ServiceCard from "../../components/service-card/service-card.component";
import { transactions } from "../../datamodels/transactions/transactions-examples";
import TransactionCard from "../../components/transaction-card/transaction-card.component";
import PageContainer from "../../utils/page-container/page-container.component";
import RoundImageContainer from "../../components/profile-avatar/round-image-container.component";

const UserProfile = () => {

    const testUser = members[1];

    const [userServices, setUserServices] = useState([])

    const [activeUserTransactions, setActiveUserTransactions] = useState([])

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
                <RoundImageContainer size="page" picture={testUser.profilePicture}/>
                <div>
                    <div className="heading-primary">{`${testUser.firstName} ${testUser.lastName}`}</div>
                    <div className="sub-text">{`@${testUser.userName}`}</div>
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
            <div>{testUser.profileDescription}</div>
            <div className="heading-secondary">Active Services</div>
            {
                activeUserTransactions.map(transaction => {
                    return(
                        <TransactionCard key={transaction.id} transaction={transaction}/>
                    )
                })
            }
        </PageContainer>
    )
}

export default UserProfile