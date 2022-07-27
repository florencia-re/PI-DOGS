import React from 'react';
import Cards from '../Cards/Cards';
import NavBar from '../NavBar/SearchBar';
import './Home.css'


export default function Home() {

    return (
        <div className='home'>
            <h1>Doggie App</h1>
            <NavBar />
            <Cards />
        </div>
    )
}