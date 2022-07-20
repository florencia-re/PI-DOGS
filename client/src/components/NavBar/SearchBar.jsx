import React from "react";
import { Link } from "react-router-dom";

export default function SearchBar(){
    return (
        <div>
            <input placeholder="Search 🐶"></input>
            <button>Search</button>
            <ul>
            <Link to='/create'>
            <button>Create</button>
            </Link>
            </ul>
        </div>
    )
}