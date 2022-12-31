import './max-size-container.styles.scss'

const MaxSizeContainer = ({children}) => {
    return(
        <div className="max-size-container">
            {children}
        </div>
    )
}

export default MaxSizeContainer