import ProviderCard from "../provider-card/provider-card.component"
import { Link } from "react-router-dom"

import "./providers-list.styles.scss"

const ProvidersList = ({ providers }) => {
    return(
        <div className="card-list">
        {
            providers.map((provider) => {
                return(
                    <ProviderCard
                        key={provider.id}
                        provider={provider} 
                    />
                )
            })
        }
        </div>
    )
}

export default ProvidersList