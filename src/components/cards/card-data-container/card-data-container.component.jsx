import './card-data-container.styles.css';

const CardDataContainer = ({ children }) => {
    return(
        <div className="card-data-container">
            {children}
        </div>
    )
}


export default CardDataContainer