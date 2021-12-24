import React from 'react'
import data from '../datasets/topNavData.json'
import { Link } from 'react-router-dom'
import * as api from '../api/authentication'
import Drawer from "rc-drawer"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faWindowClose } from '@fortawesome/free-solid-svg-icons'

const menuIcon = <FontAwesomeIcon icon={faBars} color="white" size="lg" />
const closeIcon = <FontAwesomeIcon icon ={faWindowClose} color="white" size="lg" />

export default function NavBar({ validateUser, setPageTitle, pageTitle }) {
    const [disabled, setDisabled] = React.useState(false)
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const topNavLinks = data.map((item, index) => {
        return (
            <li key={index} style={pageTitle === item.title ? {fontWeight: "bold"} : null}>
                <Link 
                  to={item.link}
                  onClick={() => {
                      setPageTitle(item.title);
                      setOpenDrawer(false);
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
                <Link to="/" ><p id="logo">EmployME</p></Link>
                <button 
                  onClick={handleLogout}
                  id="logout-btn"
                  disabled={disabled}
                >
                  Logout
                </button>
                <button
                  onClick={() => setOpenDrawer(true)}
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
                open={openDrawer}
                width="50vw"
                handler={false}
                level={null}
                autoFocus={false}
                showMask={true}
                maskClosable={true}
                onClose={() => setOpenDrawer(false)}
                placement="right"
                contentWrapperStyle={{
                    backgroundColor: "darkslateblue"
                }}
                maskStyle={{
                    opacity: "0.5"
                }}
                width="64vw"
            >
                <button 
                    onClick={() => setOpenDrawer(false)}
                    className="strip-btn"
                >
                    {closeIcon}
                </button>
                <nav id="mobile-drawer-menu">
                    {topNavLinks}
                </nav>
            </Drawer>
        </>
    )
};
