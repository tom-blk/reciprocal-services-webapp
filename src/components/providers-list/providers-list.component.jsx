import ProviderCard from "../provider-card/provider-card.component"
import { Link } from "react-router-dom"

import "./providers-list.styles.scss"

const ProvidersList = ({ users }) => {
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