import "./service-card.styles.scss";

const ServiceCard = ({title, description, icon}) => {

    const renderIcon = () => {
        if(!icon){
            return "https://www.svgrepo.com/download/382142/service.svg";
        } else {
            return icon;
        }
    }

    return(
        <div className="card service-card">
            <img className="image-icon" src={renderIcon()}/>
            <div className="card-data-container">
                <h3 className="service-card-title">{title}</h3>
                <p className="service-card-description">{description}</p>
            </div>
        </div>
    )
}

export default ServiceCard