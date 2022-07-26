import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <SearchBar />
            <Link to='/create'>
                <button>Create</button>
            </Link>
        </>
    )
}