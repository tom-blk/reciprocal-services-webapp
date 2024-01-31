import './page-container.styles.scss'
import { ReactNode } from 'react'

const PageContainer = ({children} : {children: ReactNode}) => {
    return(
        <div className="page-container">
                {children}
        </div>
    )
}

export default PageContainer