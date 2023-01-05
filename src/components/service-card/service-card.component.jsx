import { Fragment, useState } from "react";
import Modal from '../modal/modal.component'
import RoundImageContainer from "../profile-avatar/round-image-container.component";
import "./service-card.styles.scss";

const ServiceCard = ({title, description, icon, orderButtonExists}) => {

    const [modalIsOpen, setModalIsOpen] = useState()

    const renderIcon = () => {
        if(!icon){
            return "https://www.svgrepo.com/download/382142/service.svg";
        } else {
            return icon;
        }
    }

    const createTransactionAndCloseModal = (e) => {
        e.stopPropagation();
        //createTransaction()
        setModalIsOpen(false);
    }

    const openModal = (e) => {
        e.stopPropagation();
        setModalIsOpen(true);
    }

    const closeModal = (e) => {
        e.stopPropagation();
        setModalIsOpen(false);
    }

    return(
        <div className="card service-card">
            <RoundImageContainer picture={icon} size={"card"}/>
            <div className="card-data-container">
                <div className="heading-secondary">{title}</div>
                <div className="text">{description}</div>
            </div>
            {
                orderButtonExists
                ?
                <div 
                    className="button confirm-button"
                    onClick={e => openModal(e)}
                >
                    Order Service
                </div>
                :
                <Fragment/>
            }
            {
                modalIsOpen
                ?
                <Modal
                    heading={"Order Service"}
                    text={`Do you wish to book the ${title} service from this provider?`}
                    onConfirm={createTransactionAndCloseModal}
                    onClose={closeModal}
                />
                :
                <Fragment/>
            }
        </div>
    )
}

export default ServiceCard