import React from 'react';
import Cards from '../Cards/Cards';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../NavBar/SearchBar';
import Filters from '../NavBar/Filters';
import './Home.css'

export default function Home() {
    return (
        <div className='home'>
            <NavBar />
            <SearchBar />
            <Filters />
            <Cards />
        </div>
    )
}