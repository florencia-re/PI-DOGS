import React from 'react';
import Cards from '../Cards/Cards';
import NavBar from '../NavBar/NavBar';

export default function Home() {
    return (
        <div className='home'>
            <NavBar />
            <Cards />
        </div>
    )
}