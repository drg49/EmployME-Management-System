import React from 'react'
import data from '../datasets/topNavData.json'
import { Link } from 'react-router-dom'
import * as api from '../api/authentication'

export default function NavBar() {

    const topNavLinks = data.map((item, index) => {
        return (
            <li key={index}>
                <Link to="/">{item.title}</Link>
            </li>
        )
    })

    const handleLogout = () => {
        api.logout().then(() => {
            window.location.reload();
        })
    }

    return (
        <>
            <div id="logo-wrapper">
                <Link to="/" ><p id="logo">EmployME</p></Link>
                <button onClick={handleLogout}>Logout</button>
            </div>
            <nav id="top-nav">
                {topNavLinks}
            </nav>
        </>
    )
};
