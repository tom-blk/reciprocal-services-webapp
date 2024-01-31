import React from 'react';

import './banner.styles.scss';

interface props{
  type: String;
}

const Banner = ({type}: props) => {
  return (
    <div className={`banner ${type}`}>Prometheus</div>
  )
}

export default Banner
