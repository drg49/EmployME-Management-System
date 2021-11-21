import React from 'react'
import data from '../datasets/topNavData.json'
import { Link } from 'react-router-dom'

export default function NavBar() {

    const topNavLinks = data.map((item, index) => {
        return (
            <li key={index}>
                <Link>{item.title}</Link>
            </li>
        )
    })

    return (
        <>
            <div>
                <p id="logo">EmployME</p>
            </div>
            <nav id="top-nav">
                {topNavLinks}
            </nav>
        </>
    )
}