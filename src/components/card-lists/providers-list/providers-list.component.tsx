import { Provider } from "../../../types/users"
import ProviderCard from "../../cards/provider-card/provider-card.component"

const ProvidersList = ({ users }: {users: Provider[]}) => {
    return(
        <div className="card-list">
        {
            users.map((user) => {
                return(
                    <ProviderCard
                        key={user.id}
                        user={user} 
                    />
                )
            })
        }
        </div>
    )
}

export default ProvidersList