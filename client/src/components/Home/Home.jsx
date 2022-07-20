import React from 'react';
import Cards from '../Cards/Cards';
import NavBar from '../NavBar/NavBar';

export default function Home(){
    return(
        <div>
            <h1>Doggie App</h1>
            <NavBar />
            <Cards />
            
        </div>
    )
}