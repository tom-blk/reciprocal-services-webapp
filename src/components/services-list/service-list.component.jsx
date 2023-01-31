import { useContext } from "react"
import { ModalContext } from "../../context/modal.context"
import ButtonComponent from "../button/button.component"
import ServiceCard from "../service-card/service-card.component"

const ServiceList = ({ services }) => {

    const {toggleModal} = useContext(ModalContext);

    return(
        <div className="card-list">
        {
            services.map((service) => {
                return(
                    <ServiceCard
                        key={service.id}
                        service={service}
                        orderButtonExists={false}
                    />
                )
            })
        }
        </div>
    )
}

export default ServiceList