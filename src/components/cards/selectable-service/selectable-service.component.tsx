import React, { useState } from 'react'

import RoundButton from '../../buttons/round-button/round-button.component';

import './selectable-service.styles.scss';
import { SelectableService } from '../../../types/services';
import { toast } from 'react-toastify';
import AlertMessageComponent from '../../alerts/alert-message.component';
import { errorMessageOptions } from '../../alerts/alertMessageTypes';

interface Props{
    service: SelectableService;
    onClickHandler: (service: SelectableService) => void;
    updateEmbersPerHour: (serviceId: number, embersPerHour: number) => void;
}

const SelectableServiceCard = ({service, onClickHandler, updateEmbersPerHour}: Props) => {

    const [editModeEnabled, setEditModeEnabled] = useState<boolean>(false);
    const [embersPerHour, setEmbersPerHour] = useState<string | undefined>(service.embersPerHour?.toString())

    const enableEditMode = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setEditModeEnabled(true);
    }

    const applyEmbersPerHour = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if(isNaN(Number(embersPerHour)) || Number(embersPerHour) === 0 || !embersPerHour){
            toast(<AlertMessageComponent errorMessage='Please Enter A Number!'/>, errorMessageOptions)
        } else {
            updateEmbersPerHour(service.id, Number(embersPerHour));
        }
        setEditModeEnabled(false);
    }

    const returnConditionalUserInput = () => {
        if(service.isSelected)
        if(editModeEnabled){ 
            return(
                <input type='text' className='number-input' defaultValue={service.embersPerHour} onChange={e => {setEmbersPerHour(e.target.value)}} onClick={e => e.stopPropagation()} style={{width: '25px', textAlign:'right'}}/>
            )
        }else{ 
            return(
                <span>{service.embersPerHour ? service.embersPerHour : 'Specify'}</span>
            )
        }
    }

    const returnConditionalEditOrCofirmButton = () => {
        if(service.isSelected)
        if(editModeEnabled){ return(
            <RoundButton type={'confirm'} onClickHandler={applyEmbersPerHour}/>
        )}else{ return (
            <RoundButton type={'edit'} onClickHandler={e => enableEditMode(e)}/>
        )}
    }

    return (
        <div 
            className={`ssc ${service.isSelected ? 'ssc-selected main-hover' : 'ssc-unselected ssc-unselected-hover'}`}
            onClick={e => {onClickHandler(service); setEditModeEnabled(false)}}
        >
            <span className='overflow-control ssc-service-name'>{service.name}</span>
            <div className='ssc-embers-container'>
                { service.isSelected && <span className={`${!service.embersPerHour && 'warning-text'} nowrap`}>{returnConditionalUserInput()} Embers Per Hour</span>}
            </div >
            <div className='ssc-button-container'>
                { returnConditionalEditOrCofirmButton() }
            </div >
        </div>
    )
}

export default SelectableServiceCard
