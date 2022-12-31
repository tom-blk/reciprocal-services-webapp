import "./service-card.styles.scss"

const ServiceCard = ({title, description}) => {
    return(
        <div className="service-card-container">
            <h3 className="service-card-title">{title}</h3>
            <p className="service-card-description">{description}</p>
        </div>
    )
}

export default ServiceCard