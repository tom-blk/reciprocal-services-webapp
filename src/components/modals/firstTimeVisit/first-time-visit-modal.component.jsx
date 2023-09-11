import React, { useContext } from 'react'

import { ModalContext } from '../../../context/modal.context'

import Distancer from '../../../utils/distancer/distancer.component'
import ButtonComponent from '../../buttons/button.component'

import { ReactComponent as Arrow} from '../../../assets/vectors/arrow.svg';

import './first-time-visit-modal.styles.scss';

const FirstTimeVisitModal = () => {

    const {toggleModal} = useContext(ModalContext)

    const onConfirm = () => {
        localStorage.setItem('prometheusFirstTimeVisitToken', 'I have been here before!')
        toggleModal();
    }

    return (
        <div className='first-time-visit-modal-main-div'>
            <div className='center-div'>
               <h2>Welcome To Prometheus!</h2> 
            </div>
            <Distancer size={2}/>
            <h3>This site is a favour trading platform that allows communities to <span className='highlight-text'>Work Together</span> by exchanging <span className='highlight-text'>Services</span> in return for <span className='highlight-text'>Embers</span>.</h3>
            <Distancer size={2}/>
            <div>
                You can create <span className='highlight-text'>Services</span> that you want to provide for your community and other users can find that service and <span className='highlight-text'>Order</span> it from you. 
                Once the service has been provided, you get paid in <span className='highlight-text'>Embers</span>. 
                The amount of embers is depending on the <span className='highlight-text'>Hourly Rate</span> of embers that you want to charge and the hours that were provided. 
            </div>
            <Distancer size={2}/>
            <div>
                When a service already exists and you want to provide it as well, you can <span className='highlight-text'>Add It To Your Services</span> when you <span className='highlight-text'>Edit Your Profile Page</span> or on the page of the service itself. 
                To edit your profile, just navigate to your profile in the navigation bar and click the pen-shaped button. 
                If other people are providing the service that you want to add already, you can get the <span className='highlight-text'>Average Hourly Rate</span> of embers for that service and orient your own rate based on that.
            </div>
            <Distancer size={2}/>
            <div className='flex-small-gap'>
                You can see the total amount of embers available to you when you click on the small arrow on the bottom left of the page.
            </div>
            <div>
                You will see other peoples orders in your <span className='highlight-text'>Incoming Orders</span> tab and your own orders in your <span className='highlight-text'>Outgoing Orders</span> tab. 
                You can place orders by finding your favorite providers in the <span className='highlight-text'>Providers</span> tab or by finding the service you are looking for in the <span className='highlight-text'>Services</span> tab.
            </div>
            <Distancer size={2}/>
            <div className='disclaimer-text'>
                Disclaimer: The Embers that you trade are not backed by a blockchain or similar technology, so this is not a replacement for 'real' currencies and the database that they are being stored on is not designed for maximum security.
                The Platform is not to be used to circumvent paying taxes, it is merely a way to share skills and further cooperation within a community.
            </div>
            <Distancer size={2}/>
            <div className='center-div'>
                <ButtonComponent buttonType={'secondary-confirm'} onClickHandler={onConfirm}>Got it, now let me in!</ButtonComponent>
            </div>
        </div>
    )
}

export default FirstTimeVisitModal