import React from 'react'
import data from '../datasets/sideNavData.json'
import { Link } from 'react-router-dom'

export default function SideNav() {

    const sideNavLinks = data.map((item, index) => {
        return (
            <li key={index}>
                <Link to={item.link}>{item.title}</Link>
            </li>
        )
    })

    return (
        <nav id="side-nav">
            {sideNavLinks}
        </nav>
    )
};
