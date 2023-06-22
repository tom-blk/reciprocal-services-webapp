import { useContext, useEffect, useState } from "react"

import { AlertMessageContext } from "../../context/alert-message.context"
import { ModalContext } from "../../context/modal.context"

import SearchBar from "../../components/search-bar/search-bar.component"
import AddServiceModal from "../../components/modals/addService/add-service-modal.component"
import ServicesList from "../../components/card-lists/services-list/services-list.component"
import AddButtonComponent from "../../components/buttons/add-button-component/add-button.component"
import PageContainer from "../../utils/page-container/page-container.component"

import { getServiceList } from "../../api/services/read"

import "./services.styles.scss"

const Services = () => {

    const { displayError } = useContext(AlertMessageContext);
    const { toggleModal } = useContext(ModalContext);

    const [searchString, setSearchString] = useState('');
    const [superficialServiceDetails, setSuperficialServiceDetails] = useState([]);
    const [filteredServices, setFilteredServices] = useState(superficialServiceDetails);

    useEffect(() => {
        getServiceList(displayError)
            .then(response => setSuperficialServiceDetails(response))
            .catch(error=> displayError(error));
    }, [])

    useEffect(() => {
        filterServices();
    }, [searchString, superficialServiceDetails])

    const onSearchChange = (userInput) => {
        setSearchString(userInput)
    }

    const filterServices = () => {
        setFilteredServices(
            superficialServiceDetails.filter(
                service => {return service.name.toLocaleLowerCase().includes(searchString)}
            )
        )
    }

    const onAddButtonClick = () => {
        toggleModal(
            <AddServiceModal/>
        )
    }

    return(
        <PageContainer>
            <div className="services-search-and-add-service-container">
                <SearchBar className="services-search-bar" onSearchChange={onSearchChange} placeholder={"Services"}/>
                <AddButtonComponent onClickHandler={onAddButtonClick}>+</AddButtonComponent>
            </div>
            <ServicesList services={filteredServices}/>
        </PageContainer>
    )
}

export default Services