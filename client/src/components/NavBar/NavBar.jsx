import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'


export default function NavBar() {
    return (
        <nav>
            <div className='nav'>
                <Link to='/home' style={{ textDecoration: 'none' }}>
                    <h1>Doggie App 🐶</h1>
                </Link>
                <Link to='/create' >
                    <button>Create</button>
                </Link>
                <Link to='/about' style={{ textDecoration: 'none' }}>
                    About
                </Link>
            </div>

            
        </nav>
    )
}