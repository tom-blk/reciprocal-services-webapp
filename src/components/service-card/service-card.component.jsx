import { Fragment, useState } from "react";
import Modal from '../modal/modal.component'
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
            <img className="image-icon" src={renderIcon()}/>
            <div className="card-data-container">
                <h3 className="service-card-title">{title}</h3>
                <p className="service-card-description">{description}</p>
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