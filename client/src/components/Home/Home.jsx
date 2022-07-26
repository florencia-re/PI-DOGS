import React from 'react';
import Cards from '../Cards/Cards';
import NavBar from '../NavBar/SearchBar';
// import { useEffect, useSelector } from 'react';
// import { useDispatch } from 'react-redux';
// import Paginate from './Paginate';
// import { getDogs } from '../../redux/actions';

export default function Home() {

    return (
        <div>
            <h1>Doggie App</h1>
            <NavBar />
            <Cards />

        </div>
    )
}