import ProviderCard from "../provider-card/provider-card.component"

const ProvidersList = ({ providers }) => {
    return(
        <div>
        {
            providers.map((provider) => {
                return(
                    <ProviderCard
                        key={provider.id} 
                        id={provider.id}
                        firstName={provider.firstName} 
                        lastName={provider.lastName}
                    />
                )
            })
        }
        </div>
    )
}

export default ProvidersList