import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, filterByTemps } from '../../redux/actions';

export default function Filters() {

    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state) => state.temperaments)

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    //console.log(allTemperaments)

    const handlerfilterByTemps= (e) => {
        //e.target.value -> es el 'option' elegido
        dispatch(filterByTemps(e.target.value))
    }

    return (
        <>
            <h3>Filter by A - Z and Z - A</h3>
            <select>
                <option>Select</option>
                <option>A - Z</option>
                <option>Z - A</option>
            </select>

            <h3>Filter by Temperament:</h3>
            <select onChange={(e) => handlerfilterByTemps(e)}>
                <option value='All'>All</option>
                {allTemperaments.length > 0 ? allTemperaments.sort((a, b) => {
                    if ((a.name < b.name) || (a.name || b.name) === '') return -1
                    if (a.name > b.name ) return 1
                    return 0
                }).map((temp) => {
                    return (
                        <option key={temp.id} value={temp.name}>{temp.name}</option>)
                })
                    : ''}
            </select>
        </>
    )
}