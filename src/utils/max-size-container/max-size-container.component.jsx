import './max-size-container.styles.scss'
import ModalAndErrorContainer from './modal-and-error-container.component'

const MaxSizeContainer = ({children}) => {
    return(
        <div className="max-size-container">
            <ModalAndErrorContainer/>
            <div className='content-container'>
                {children}
            </div>
        </div>
    )
}

export default MaxSizeContainer