import "./service-card.styles.scss";
import HammerSVG from "../../assets/hammer-svgrepo-com.svg";

const ServiceCard = ({title, description, icon}) => {
    return(
        <div className="card service-card">
            <img className="image-icon" src={HammerSVG}/>
            <div className="card-data-container">
                <h3 className="service-card-title">{title}</h3>
                <p className="service-card-description">{description}</p>
            </div>
        </div>
    )
}

export default ServiceCard