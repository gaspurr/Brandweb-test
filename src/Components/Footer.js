import React from 'react'
import { InputForm, Form } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import "./Footer.css"
import SearchBar from './SearchBar'

function Footer() {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-container">
                    <NavLink to="/" className="nav-logo">
                        Brandweb
                    </NavLink>
                    <ul className="nav-menu">
                        <li key="1" className="nav-item">
                            Something interesting
                            <p>*Boing</p>
                        </li>
                        <li key="2" className="nav-item">
                            This could potentially be really interesting
                        </li>
                        <li key="3" className="nav-item">
                            <p style={{ color: "red" }}>I don't know why the footer is not fixed to the bottom and why there is a gap</p>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}

export default Footer