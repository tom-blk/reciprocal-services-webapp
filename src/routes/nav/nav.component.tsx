import React, { Fragment, useContext, useState } from "react";
import { Outlet } from "react-router"
import { Link } from "react-router-dom"

import { logOut } from "../../api/auth/log-out";

import { ModalContext } from "../../context/modal.context";
import { UserContext } from "../../context/user.context";

import LogIn from "../login/login.component";
import EmberCounter from "../../components/ember-counter/ember-counter.component";
import ConfirmOrCancelModal from "../../components/modals/confirmOrCancel/confirm-or-cancel-modal.component";
import Banner from "../../components/banner/banner.component";
import MaxSizeContainer from "../../utils/max-size-container/max-size-container.component";
import BurgerMenuButton from "../../components/buttons/burger-menu-button/burger-menu-button.component";

import "./nav.styles.scss"

const Nav = () => {

    const { user, setUser } = useContext(UserContext);
    const { toggleModal } = useContext(ModalContext);
    
    const [mobileNavActive, setMobileNavActive] = useState<boolean>(false);

    const toggleMobileNav = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        setMobileNavActive(!mobileNavActive);
    }

    const hideMobileNav = () => {
        setMobileNavActive(false)
    }

    const toggleLogOutModal = () => {

        const confirmLogOut = () => {
            logOut()
                .then(() => {
                    setUser(undefined);
                })
        }

        toggleModal(<ConfirmOrCancelModal prompt={'Do you really want to log out?'} onConfirm={confirmLogOut}/>)
    }

    const logOutDiv = () => {
        return(
            <div style={{color: 'white', cursor: 'pointer'}} onClick={e => toggleLogOutModal()}>Log Out</div>
        )
    }

    return(
        <div onClick={hideMobileNav}>
        {
            !user
            ?
            <LogIn/>
            :
            <MaxSizeContainer>
                <div className="banner-container">
                    <Banner type={'header'}/>
                </div>
                <Fragment>
                    <div className="navbar-container">
                        <Link to='/'>Home</Link>
                        <Link to='/services'>Services</Link>
                        <Link to='/providers'>Providers</Link>
                        <Link to='/outgoing-orders'>Outgoing Orders</Link>
                        <Link to='/incoming-orders'>Incoming Orders</Link>
                        <Link to='/userProfile'>Your Profile</Link>
                        {logOutDiv()}
                    </div>
                </Fragment>
                <Outlet/> 
                <EmberCounter/>
                <div className={`navbar-container-mobile ${mobileNavActive ? 'navbar-container-mobile-active' : 'navbar-container-mobile-inactive'}`}>
                    <BurgerMenuButton active={mobileNavActive} onClick={toggleMobileNav}/>
                    <div className="navbar-mobile">
                        <Link to='/'>Home</Link>
                        <Link to='/services'>Services</Link>
                        <Link to='/providers'>Providers</Link>
                        <Link to='/outgoing-orders'>Outgoing Orders</Link>
                        <Link to='/incoming-orders'>Incoming Orders</Link>
                        <Link to='/userProfile'>Your Profile</Link>
                        {logOutDiv()}
                    </div>
                </div>
            </MaxSizeContainer>
        }  
        </div>
    )
}

export default Nav
