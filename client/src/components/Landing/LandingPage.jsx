import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage(){
    return(
        <div>
            <div className='landing'>
                <div>
                    <h1>Doggie Web App</h1>
                    <h2>Your new favorite web site where you can find out information about your best friend ever </h2>
                </div>
                <Link to='/home'>
                    <button className="btn-landing">Find yours!</button>
                </Link>
                <div id='imagen'></div>
            </div>
        </div>
    );
}

