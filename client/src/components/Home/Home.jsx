import React from 'react';
import Cards from '../Cards/Cards';
import NavBar from '../NavBar/NavBar';
import Footer from "./../Footer/Footer"

export default function Home() {
    return (
        <div className='home'>
            <NavBar />
            <Cards />
            <Footer/>
        </div>
    )
}