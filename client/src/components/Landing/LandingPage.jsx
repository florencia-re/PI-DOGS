import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './LandingPage.css'

export default function LandingPage(){
    return(
        <div className='landing1'>
        <NavBar />
            <div className='landing'>
                <div>
                    <h2>Doggie Web App</h2>
                    <h3 className='my-4 fst-italic fw-normal'>Your new favorite web site where you can find out information about your best friend ever </h3>
                </div>
                <Link to='/home'>
                    <button className="btn-landing mt-3">Find yours!</button>
                </Link>
                <div id='imagen'></div>
            </div>
        </div>
    );
}

