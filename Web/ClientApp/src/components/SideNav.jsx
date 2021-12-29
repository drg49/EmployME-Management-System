import React from 'react'
import data from '../datasets/sideNavData.json'
import { Link } from 'react-router-dom'

export default function SideNav({ setPageTitle, pageTitle }) {

    const sideNavLinks = data.map((item, index) => {
        return (
            <li key={index} style={pageTitle === item.title ? {fontWeight: "bold"} : null}>
                <Link
                  to={item.link}
                  onClick={() => {
                    setPageTitle(item.title);
                  }}
                >
                    {item.title}
                </Link>
            </li>
        )
    })

    return (
        <nav id="side-nav">
            {sideNavLinks}
        </nav>
    )
};
