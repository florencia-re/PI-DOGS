import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDogs, getTemperaments, filterByTemps, filterByOrigin } from '../../redux/actions';

export default function Filters() {

    const dispatch = useDispatch();
    const allTemperaments = useSelector((state) => state.temperaments)

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    //console.log(allTemperaments)

    const handlerFilterByTemps = (e) => {
        //e.target.value -> es el 'option' elegido
        dispatch(filterByTemps(e.target.value))
    }

    const handlerFilterByOrigin = (e) => {
        dispatch(filterByOrigin(e.target.value))
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
            <select onChange={(e) => handlerFilterByTemps(e)}>
                <option value='All'>All</option>
                {allTemperaments?.sort((a, b) => {
                    if ((a.name < b.name) || (a.name || b.name) === '') return -1
                    if (a.name > b.name) return 1
                    return 0
                }).map((temp) => {
                    return (
                        <option key={temp.id} value={temp.name}>{temp.name}</option>)
                })
                }
            </select>

            <h3>Filter by Origin (Existente or Created):</h3>
            <select onChange={(e) => handlerFilterByOrigin(e)}>
                <option value="All">All</option>
                <option value="Created">Created</option>
                <option value='Exists'>Exists</option>
            </select>

        </>
    )
}