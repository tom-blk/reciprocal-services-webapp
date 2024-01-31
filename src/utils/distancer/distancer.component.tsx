import React from 'react';
import './distancer.styles.scss';

const Distancer = ({size}: {size: number}) => {

    return (
        <div className={`distancer-${size}`}/>
    )
}

export default Distancer