import React from 'react';

import './banner.styles.scss';

const Banner = ({type}) => {
  return (
    <div className={`banner ${type}`}>Prometheus</div>
  )
}

export default Banner
