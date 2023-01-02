import './max-size-container.styles.scss'

const MaxSizeContainer = ({children}) => {
    return(
        <div className="max-size-container">
            <div className='content-container'>
                {children}
            </div>
        </div>
    )
}

export default MaxSizeContainer