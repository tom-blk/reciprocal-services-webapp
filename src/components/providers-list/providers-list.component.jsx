import ProviderCard from "../provider-card/provider-card.component"
import { Link } from "react-router-dom"

import "./providers-list.styles.scss"

const ProvidersList = ({ providers }) => {
    return(
        <div className="card-list">
        {
            providers.map((provider) => {
                return(
                <Link key={provider.id} to={`${provider.id}`}>
                    <ProviderCard
                        firstName={provider.firstName} 
                        lastName={provider.lastName}
                    />
                </Link>
                )
            })
        }
        </div>
    )
}

export default ProvidersList