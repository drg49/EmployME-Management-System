import React from 'react'
import data from '../datasets/topNavData.json'
import subMenuData from '../datasets/sideNavData.json'
import { Link } from 'react-router-dom'
import * as api from '../api/authentication'
import Drawer from "rc-drawer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClipboard, faArrowAltCircleRight, faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'

const menuIcon = <FontAwesomeIcon icon={faBars} color="white" size="lg" />
const subMenuIcon = <FontAwesomeIcon icon={faClipboard} color="white" size="lg" />
const closeRightIcon = <FontAwesomeIcon icon ={faArrowAltCircleRight} color="white" size="lg" />
const closeLeftIcon = <FontAwesomeIcon icon ={faArrowAltCircleLeft} color="white" size="lg" />

export default function NavBar({ validateUser, setPageTitle, pageTitle }) {
    const [disabled, setDisabled] = React.useState(false)
    const [openRightDrawer, setOpenRightDrawer] = React.useState(false);
    const [openLeftDrawer, setOpenLeftDrawer] = React.useState(false);

    const topNavLinks = data.map((item, index) => {
        return (
            <li key={index} style={pageTitle === item.title ? {fontWeight: "bold"} : null}>
                <Link 
                  to={item.link}
                  onClick={() => {
                      setPageTitle(item.title);
                      setOpenRightDrawer(false);
                  }}
                >
                  {item.title}
                </Link>
            </li>
        )
    })

    const subNavLinks = subMenuData.map((item, index) => {
        return (
            <li key={index} style={pageTitle === item.title ? {fontWeight: "bold"} : null}>
                <Link 
                  to={item.link}
                  onClick={() => {
                      setPageTitle(item.title);
                      setOpenLeftDrawer(false);
                  }}
                >
                  {item.title}
                </Link>
            </li>
        )
    })

    const handleLogout = () => {
        setDisabled(true)
        api.logout().then(() => {
            validateUser();
            setDisabled(false);
            setPageTitle('Dashboard')
        })
    }

    return (
        <>
            <div id="logo-wrapper">
                <button
                  onClick={() => setOpenLeftDrawer(true)}
                  className="strip-btn"
                  id="mobile-menu-btn"
                >
                  {subMenuIcon}
                </button>
                <Link to="/"  onClick={() => setPageTitle('Dashboard')}>
                    <p id="logo">EmployME</p>
                </Link>
                <button 
                  onClick={handleLogout}
                  id="logout-btn"
                  disabled={disabled}
                >
                  Logout
                </button>
                <button
                  onClick={() => setOpenRightDrawer(true)}
                  className="strip-btn"
                  id="mobile-menu-btn"
                >
                  {menuIcon}
                </button>
            </div>
            <nav id="top-nav">
                {topNavLinks}
            </nav>
            <Drawer
                open={openRightDrawer}
                width="50vw"
                handler={false}
                level={null}
                autoFocus={false}
                showMask={true}
                maskClosable={true}
                onClose={() => setOpenRightDrawer(false)}
                placement="right"
                contentWrapperStyle={{
                    background: 'rgb(85,73,154)',
                    background: 'radial-gradient(circle, rgba(85,73,154,1) 0%, rgba(57,48,110,1) 100%)',
                }}
                maskStyle={{
                    opacity: "0.5"
                }}
                width="64vw"
            >
                <button 
                    onClick={() => setOpenRightDrawer(false)}
                    className="strip-btn"
                    id="mobile-menu-close-btn"
                >
                    {closeRightIcon}
                </button>
                <nav id="mobile-drawer-menu">
                    {topNavLinks}
                </nav>
            </Drawer>
            <Drawer
                open={openLeftDrawer}
                width="50vw"
                handler={false}
                level={null}
                autoFocus={false}
                showMask={true}
                maskClosable={true}
                onClose={() => setOpenLeftDrawer(false)}
                placement="left"
                contentWrapperStyle={{
                    background: 'rgb(85,73,154)',
                    background: 'radial-gradient(circle, rgba(85,73,154,1) 0%, rgba(57,48,110,1) 100%)',
                    textAlign: "right"
                }}
                maskStyle={{
                    opacity: "0.5"
                }}
                width="64vw"
            >
                <button 
                    onClick={() => setOpenLeftDrawer(false)}
                    className="strip-btn"
                    id="mobile-menu-close-btn"
                >
                    {closeLeftIcon}
                </button>
                <nav id="mobile-drawer-menu">
                    {subNavLinks}
                </nav>
            </Drawer>
        </>
    )
};
