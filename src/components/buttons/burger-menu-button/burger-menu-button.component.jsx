import './burger-menu-button.styles.scss';

const BurgerMenuButton = ({active, onClick}) => {

  return (
    <button onClick={e => onClick(e)} className={`hamburger-button ${active ? 'ham-active' : 'ham-inactive'}`}>
      <svg className='hamburger' viewBox='0 0 100 100' width='30px'>
        <rect
          className={`hamburger-rect ${active ? 'hamburger-middle-line' : 'hamburger-top-line'}`}
          width='80' height='10'
        />
        <rect
          className='hamburger-rect hamburger-middle-line'
          width='80' height='10'
        />
        <rect
          className={`hamburger-rect ${active ? 'hamburger-middle-line' : 'hamburger-bottom-line'}`}
          width='80' height='10'
        />
      </svg>
    </button>
  );
}


export default BurgerMenuButton;