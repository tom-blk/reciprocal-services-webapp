import { useContext, useEffect, useState } from 'react'

import { UserContext } from '../../context/user.context';

import PageContainer from '../../utils/page-container/page-container.component';
import ButtonComponent from '../buttons/button.component';
import SearchBar from '../search-bar/search-bar.component';
import SelectableServiceCard from '../cards/selectable-service/selectable-service.component';

import { useNavigate } from 'react-router';

import { updateUserSpecificServices } from '../../api/users/update';
import { getServiceList } from '../../api/services/read';

import './edit-user-services.styles.scss';
import Distancer from '../../utils/distancer/distancer.component';
import { UserSpecificService, SelectableService } from '../../types/services';
import { toast } from 'react-toastify';
import { errorMessageOptions, successMessageOptions } from '../alerts/alertMessageTypes';
import AlertMessageComponent from '../alerts/alert-message.component';

const EditUserServicesList = () => {

    // Should be a way to avoid making the component iterate through all services as much as it does, which would make it much more performant and scalable - REVISIT!
    const { user, userServices, fetchUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [searchString, setSearchString] = useState('')
    const [filteredServices, setFilteredServices] = useState<SelectableService[]>([]);
    const [services, setServices] = useState<SelectableService[]>([]);

    useEffect(() => {
        if(userServices)
        getServiceList()
            .then(response => setServices(markUserServicesAndSort(response, userServices)))
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions )})
    }, [userServices])

    useEffect(() => {
        const filterServices = () => {
            setFilteredServices(
                services.filter(
                    service => {return service.name.toLocaleLowerCase().includes(searchString)}
                )
            )
        }

        filterServices()
    }, [searchString, services])

    const onSearchChange = (userInput: string) => {
        setSearchString(userInput)
    }



    const markUserServicesAndSort = (allServices: SelectableService[], userServices: UserSpecificService[]) => {
        
        // Decide wether service is selected or not and set add embersPerHourChanged attribute to each service (is only needed in front-end)
        allServices.forEach(service => {
            const index = userServices.findIndex(userService => userService.id === service.id)

            if(userServices[index]?.id === service.id){
                service.isSelected = true;
                service.embersPerHour = userServices[index].creditsPerHour
            } else {
                service.isSelected = false;
            }
            service.embersPerHourChanged = false;
            service.selectionStatusWasChanged = false;
        });

        // Sort  by selection status and alphabetically
        allServices.sort((a,b) => (+b.isSelected - +a.isSelected || a.name.localeCompare(b.name)));

        return allServices;
    };

    const onServiceCardClick = (clickedService: SelectableService) => {
        const tempServices = services;

        let index = tempServices.findIndex(service => (service.id === clickedService.id));

        tempServices[index].selectionStatusWasChanged = true;
        tempServices[index].isSelected = !tempServices[index].isSelected;        

        setServices([...tempServices]);
    };

    const confirmEmbersPerHour = (serviceId: number, numberOfEmbers: number) => {
        const tempServices = services;

        const index = tempServices.findIndex(service => service.id === serviceId);

        tempServices[index].embersPerHourChanged = true;
        tempServices[index].embersPerHour = numberOfEmbers;

        setServices([...tempServices]);
    };

    const confirmButtonOnClickHandler = () => {
        const servicesToBeChanged: SelectableService[] = [];

        services.forEach(service => {
            if(service.selectionStatusWasChanged || service.embersPerHourChanged)
                servicesToBeChanged.push(service)
        });

        updateUserSpecificServices(user!.id, servicesToBeChanged)
            .then(() => {
                fetchUser()
                navigate('/userProfile-edit');
                toast(<AlertMessageComponent successMessage={'Services Successfully Updated!'}/>, successMessageOptions);
            })
            .catch(error => {toast(<AlertMessageComponent errorMessage={error.message}/>, errorMessageOptions )});
    };

    const cancelButtonOnClickHandler = () => navigate(`/userProfile-edit`);

    return (
        <PageContainer>
            <SearchBar 
                placeholder={'Services'}
                onSearchChange={onSearchChange}
                className={'edit-user-services-search-bar'}
            />
            <div className='edit-user-services-search-and-button-bar'>
                <ButtonComponent buttonType={'confirm'} onClickHandler={confirmButtonOnClickHandler}>Save Changes</ButtonComponent>
                <ButtonComponent buttonType={'cancel'} onClickHandler={cancelButtonOnClickHandler}>Cancel</ButtonComponent>
            </div>
            <Distancer size={1}/>
            <div className='card-list'>
                {
                    filteredServices
                    &&
                    filteredServices.map(service => {
                        return(
                                <SelectableServiceCard key={service.id} onClickHandler={onServiceCardClick} updateEmbersPerHour={confirmEmbersPerHour} service={service}/>
                            )
                        }
                    )
                }
            </div>
        </PageContainer>
    )
}

export default EditUserServicesList
