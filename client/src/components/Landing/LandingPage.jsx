import React from 'react';
import { Link } from 'react-router-dom';
//import './LandingPage.css'

export default function LandingPage(){
    return(
        <body id='container'>
            <div className='landing'>
                <div id='landing2'>
                <h1>Doggie Web</h1>
                <h2>The favorite web site when you find out information about your best friend ever</h2>
                </div>
                <Link to='/home'>
                    <button className="button-28">Find yours!</button>
                </Link>
            </div>
        </body>
    );
}

