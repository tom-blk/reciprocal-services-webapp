const ProviderCard = ({ firstName, lastName }) => {

    return(
        <div className="provider-card-container">
            <h3 className="provider-card-last-name">{firstName + ' ' +lastName}</h3>
        </div>
    )
}

export default ProviderCard