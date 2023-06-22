import React, { useEffect, useState } from 'react'

import RoundButton from '../../buttons/round-button/round-button.component';

import './selectable-service.styles.scss';


const SelectableService = ({service, onClickHandler, updateEmbersPerHour}) => {

    const [isSelected, setIsSelected] = useState(service.isSelected);
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [embersPerHour, setEmbersPerHour] = useState(service.embersPerHour)

    const enableEditMode = (e) => {
        e.stopPropagation();
        setEditModeEnabled(true);
    }

    const applyEmbersPerHour = (e) => {
        e.stopPropagation();
        if(embersPerHour != service.embersPerHour)
            updateEmbersPerHour(service.id, embersPerHour);
        setEditModeEnabled(false);
    }

    return (
        <div 
            className={`ssc main-hover ${service.isSelected && 'ssc-active'}`}
            onClick={e => {onClickHandler(service); setIsSelected(!isSelected); setEditModeEnabled(false)}}
        >
            {
                editModeEnabled
                ?
                <div className='ssc-container'>
                    <input type='text' className='number-input' placeholder={service.embersPerHour} onChange={e => {setEmbersPerHour(e.target.value)}} onClick={e => e.stopPropagation()} style={{width: '25px', textAlign:'right'}}/>
                    <span>Embers/Hour</span>
                    <RoundButton size={'20px'} type={'confirm'} onClickHandler={applyEmbersPerHour}/>
                </div>
                :
                <div className='ssc-container'>
                    <div>{service.name}</div>
                    {service.isSelected && <RoundButton size={'20px'} type={'edit'} onClickHandler={e => enableEditMode(e)}/>}
                </div>
            }
        </div>
    )
}

export default SelectableService
