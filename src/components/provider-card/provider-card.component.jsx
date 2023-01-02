const ProviderCard = ({ firstName, lastName }) => {

    return(
        <div className="card">
            <h3 className="provider-card-last-name">{firstName + ' ' +lastName}</h3>
        </div>
    )
}

export default ProviderCard