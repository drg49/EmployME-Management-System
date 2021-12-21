import React from 'react'
import data from '../datasets/topNavData.json'
import { Link } from 'react-router-dom'
import * as api from '../api/authentication'

export default function NavBar({ validateUser }) {
    const [disabled, setDisabled] = React.useState(false)

    const topNavLinks = data.map((item, index) => {
        return (
            <li key={index}>
                <Link to={item.link}>{item.title}</Link>
            </li>
        )
    })

    const handleLogout = () => {
        setDisabled(true)
        api.logout().then(() => {
            validateUser();
            setDisabled(false);
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
            </div>
            <nav id="top-nav">
                {topNavLinks}
            </nav>
        </>
    )
};
