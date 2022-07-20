import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return(
        <body id='body'>
            <div className='landing'>
                <div id='landing2'>
                    <h1>Doggie Web App</h1>
                    <h2>The favorite web site where you can find out information about your best friend ever </h2>
                </div>
                <Link to='/home'>
                    <button className="button-28">Find yours!</button>
                </Link>
                <div id='imagen'></div>
            </div>
        </body>
    );
}

