import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

import { getSuperficialServiceDetails } from '../../api/services/get-all-services';
import { getUserSpecificServices } from '../../api/services/get-user-specific-services';
import { updateUserSpecificServices } from '../../api/services/update-user-specific-services';

import { AlertMessageContext } from '../../context/alert-message.context';
import { UserContext } from '../../context/user.context';
import MaxSizeContainer from '../../utils/max-size-container/max-size-container.component';
import PageContainer from '../../utils/page-container/page-container.component';
import ButtonComponent from '../button/button.component';
import SearchBar from '../search-bar/search-bar.component';

import SelectableServiceCard from '../selectable-service-card/selectable-service-card.component';

import './selectable-services-list.styles.scss';

const SelectableServicesList = ({userId}) => {

    const { displayError, displaySuccessMessage } = useContext(AlertMessageContext);
    const { testUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [allServicesWithoutUserServices, setAllServicesWithoutUserServices] = useState([]);
    const [userServices, setUserServices] = useState([]);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]); //Keeps track of what was selected so it can be sent to the backend without causing optical changes in the lists due to mapping
    const [searchString, setSearchString] = useState('')
    const [filteredServices, setFilteredServices] = useState([]);


    useEffect(() => {
        getUserSpecificServices(testUser.id, displayError)
            .then(response => {
                setUserServices(response) 
                setSelectedServiceIds(extractIdsIntoNewArray(response))
            })
    }, [])


    useEffect(() => {
        getSuperficialServiceDetails(displayError)
            .then(response => setAllServicesWithoutUserServices(assignSelectionStatusAndReturnServices(response, userServices)));
    }, [userServices])


    useEffect(() => {
        filterServices()
    }, [searchString, allServicesWithoutUserServices])
    

    const onSearchChange = (userInput) => {
        setSearchString(userInput)
    }


    const filterServices = () => {
        setFilteredServices(
            allServicesWithoutUserServices.filter(
                service => {return service.name.toLocaleLowerCase().includes(searchString)}
            )
        )
    }


    const sortServicesBySelectionStatus = (services) => {
        return(services.sort((a, b) => {
            if(a.isSelected && !b.isSelected) return -1;
            if(!a.isSelected && !b.isSelected) return 1;
            return 0;
        }))
    }


    const extractIdsIntoNewArray = (services) => {
        const serviceIds = []

        services.forEach((service) => {
            serviceIds.push(service.id)
        })

        return serviceIds;
    }


    const assignSelectionStatusAndReturnServices = (selectionCollection, selectedServices) => {
        const compareServiceId = (service1, service2) => {
            return service1.id === service2.id
        }
        
        selectionCollection.forEach(service => {
            if(selectedServices.some(userService => compareServiceId(service, userService))){
                service.isSelected = true;
            } else {
                service.isSelected = false;
            }
        })

        sortServicesBySelectionStatus(selectionCollection);
        
        return selectionCollection;
    }


    const onServiceCardClick = (clickedService) => {
        let tempServices = allServicesWithoutUserServices;

        const findServiceIndex = (services, clickedService) => {
            return(services.findIndex(service => (service.id === clickedService.id)))
        }

        let serviceIndex = findServiceIndex(tempServices, clickedService);
        
        const modifySelectedServiceIdsConditionally = () => {
            if(selectedServiceIds.includes(clickedService.id))
                return selectedServiceIds.filter(serviceId => (serviceId !== tempServices[serviceIndex].id));
            if(!selectedServiceIds.includes(clickedService.id))
                return selectedServiceIds.concat(clickedService.id);
        }

        setSelectedServiceIds(modifySelectedServiceIdsConditionally);

        tempServices[serviceIndex].isSelected = !tempServices[serviceIndex].isSelected;

        setAllServicesWithoutUserServices(tempServices);
    }

    const confirmButtonOnClickHandler = () => {
        updateUserSpecificServices(testUser.id, selectedServiceIds, displayError)
            .then(displaySuccessMessage('Services Successfully Updated!'));
    }

    const cancelButtonOnClickHandler = () => navigate(`/userProfile-edit`)

    return (
        <MaxSizeContainer>
            <PageContainer>
                <SearchBar 
                    placeholder={'Services'}
                    onSearchChange={onSearchChange}
                />
                <div className='selectable-services-list'>
                    {
                        filteredServices
                        &&
                        filteredServices.map(service => {
                            return(
                                    <SelectableServiceCard key={service.id} onClickHandler={onServiceCardClick} service={service} serviceName={service.name}/>
                                )
                            }
                        )
                    }
                </div>
                <ButtonComponent buttonType={'confirm'} onClickHandler={confirmButtonOnClickHandler}>Save Changes</ButtonComponent>
                <ButtonComponent buttonType={'cancel'} onClickHandler={cancelButtonOnClickHandler}>Discard Changes</ButtonComponent>
            </PageContainer>
        </MaxSizeContainer>
    )
}

export default SelectableServicesList
