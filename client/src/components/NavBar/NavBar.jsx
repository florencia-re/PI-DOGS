import React from "react";
import { Link } from "react-router-dom";
import SearchBar from '../NavBar/SearchBar';
import './NavBar.css'

export default function NavBar() {
    return (
        <nav><div>
                <Link className="a" to='/create' >
                    <button className="btn-nav">Create Dog</button>
                </Link>
            </div>
            <div>
                <Link to='/home' className="div-home">
                    <h1>Doggie App 🐶</h1>
                </Link>
            </div>
            
            <div className="container-search">
                <SearchBar />
            </div>

        </nav>
    )
}