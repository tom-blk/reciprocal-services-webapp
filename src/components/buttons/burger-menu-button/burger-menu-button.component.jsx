import {useState} from 'react';

import './burger-menu-button.styles.scss';

const BurgerMenuButton = () => {

  const [menuExpanded, setMenuExpanded] = useState('initial');

  const onHamburgerClick = () => {
    if(menuExpanded === 'initial'){
      setMenuExpanded(true);
    } else {
      setMenuExpanded(!menuExpanded);
    }
  }

  const assertButtonClass = () => {
    if(menuExpanded==='initial'){
      return 'hamburger-button'
    } else if(!menuExpanded){
      return 'hamburger-button hamburger-button-inactive'
    } else if(menuExpanded){
      return 'hamburger-button hamburger-button-active'
    }
  }

  return (
    <div className="App">
      <button onClick={onHamburgerClick} className={assertButtonClass()}>
        <svg className='hamburger' viewBox='0 0 100 100' width='30px'>
          <rect
            className={`hamburger-rect ${(menuExpanded && menuExpanded!=='initial') ? 'hamburger-middle-line' : 'hamburger-top-line'}`}
            width='80' height='10'
          />
          <rect
            className='hamburger-rect hamburger-middle-line'
            width='80' height='10'
          />
          <rect
            className={`hamburger-rect ${(menuExpanded && menuExpanded!=='initial') ? 'hamburger-middle-line' : 'hamburger-bottom-line'}`}
            width='80' height='10'
          />
        </svg>
      </button>
    </div>
  );
}


export default BurgerMenuButton;