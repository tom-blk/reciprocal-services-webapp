import React, { Fragment, useContext, useEffect, useState } from 'react'

import { getSuperficialServiceDetails } from '../../api/services/get-all-services';
import { getUserSpecificServices } from '../../api/services/get-user-specific-services';

import { AlertMessageContext } from '../../context/alert-message.context';
import SearchBar from '../search-bar/search-bar.component';

import SelectableServiceCard from '../selectable-service-card/selectable-service-card.component';

import './selectable-services-list.styles.scss';

const SelectableServicesList = ({userId}) => {

    const { displayError } = useContext(AlertMessageContext);

    const [allServicesWithoutUserServices, setAllServicesWithoutUserServices] = useState([]);
    const [userServices, setUserServices] = useState([]);
    const [activeServiceIds, setActiveServiceIds] = useState([]); //Keeps track of what was selected so it can be sent to the backend without causing optical changes in the lists due to mapping
    const [searchString, setSearchString] = useState('')
    const [filteredServices, setFilteredServices] = useState([]);


    useEffect(() => {
        getUserSpecificServices(userId, displayError)
            .then(response => {
                setUserServices(response) 
                setActiveServiceIds(extractIdsIntoNewArray(response))
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


    const sortServicesAlphabetically = (services) => {
        return(services.sort((a, b) => {
            if(a.name < b.name) return -1;
            if(a.name > b.name) return 1;
            return 0;
        }))
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

        sortServicesAlphabetically(selectionCollection);
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
            if(activeServiceIds.includes(clickedService.id))
                return activeServiceIds.filter(serviceId => (serviceId !== tempServices[serviceIndex].id));
            if(!activeServiceIds.includes(clickedService.id))
                return activeServiceIds.concat(clickedService.id);
        }

        setActiveServiceIds(modifySelectedServiceIdsConditionally);

        tempServices[serviceIndex].isSelected = !tempServices[serviceIndex].isSelected;

        setAllServicesWithoutUserServices(tempServices);
    }


    return (
        <Fragment>
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
        </Fragment>
    )
}

export default SelectableServicesList
