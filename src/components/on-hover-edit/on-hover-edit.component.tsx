import { ReactNode } from 'react'
import {ReactComponent as EditSVG} from '../../assets/vectors/edit.svg';

import './on-hover-edit.styles.scss';

interface Props{
  size: string;
  onClickFunction: () => void;
  children: ReactNode;
}

const OnHoverEdit = ({size, onClickFunction, children}: Props) => {
  return (
    <div onClick={e => onClickFunction()} className={`on-hover-edit-container ${size}`}>
        <div className='on-hover-edit-children-div'>
            {children}
        </div>
        <div className='on-hover-edit-image'>
          <EditSVG />
        </div>
    </div>
    
    
  )
}

export default OnHoverEdit
