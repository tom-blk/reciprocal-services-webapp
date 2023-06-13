import React, { useEffect, useState } from 'react'

import RoundButton from '../round-button/round-button.component';

import './selectable-service-card.styles.scss';


const SelectableServiceCard = ({service, onClickHandler, changeEmbersPerHour}) => {

    const [isSelected, setIsSelected] = useState(service.isSelected);
    const [editModeEnabled, setEditModeEnabled] = useState(false);

    useEffect(() => {
    }, [])

    const enableEditMode = (e) => {
        e.stopPropagation();
        setEditModeEnabled(true);
    }

    const applyEmbersPerHour = (e) => {
        e.stopPropagation();
        setEditModeEnabled(false)
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
                    <input type='text' className='number-input' value={service.embersPerHour} onChange={e => {changeEmbersPerHour(service.id, e.target.value)}} onClick={e => e.stopPropagation()} style={{width: '25px', textAlign:'right'}}/>
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

export default SelectableServiceCard
