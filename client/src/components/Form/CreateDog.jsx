import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getTemperaments, postDog } from '../../redux/actions';
import { Link, useHistory } from "react-router-dom";
import './CreateDog.css';

export default function CreateDog() {

    const dispatch = useDispatch()
    //me redirige al home con hisotry.push('/home')
    const history = useHistory()

    const temperaments = useSelector(state => state.temperaments)
    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const [dog, setDog] = useState({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        lifeSpan: "",
        image: "",
        temperaments: []
    })

    const handleChange = (e) => {  //en cada input onChange va a ir modificando la propiedad del estado, que se corresponde con el value
        setDog({
            ...dog,
            [e.target.name]: e.target.value
        })
        // console.log(dog)
    }

    const handleSelect = (e) => {
        setDog({
            ...dog,
            temperaments: [...dog.temperaments, e.target.value]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(dog)
        dispatch(postDog(dog))
        alert('Your doggie was successfully created 🐶')
        setDog({
            name: "",
            heightMin: "",
            heightMax: "",
            weightMin: "",
            weightMax: "",
            lifeSpan: "",
            image: "",
            temperaments: []
        })
        history.push('/home')
    }

    const handleDeleteTemperament = (e) => {
        setDog({
            ...dog,
            temperaments: dog.temperaments.filter(temp => temp !== e)
        })
    }

    return (
        <div className='div-form'>
            <h3>Create a New Doggie!</h3>
            <form className='form' onSubmit={e => handleSubmit(e)}>
                <label>Name</label>
                <input type='text' name='name' value={dog.name} onChange={e => handleChange(e)}></input>
                <label>Minimum Height (centimeters in numbers):</label>
                <input type='number' name='heightMin' value={dog.heightMin} onChange={e => handleChange(e)}></input>
                <label>Maximum Height (centimeters in numbers):</label>
                <input type='number' name='heightMax' value={dog.heightMax} onChange={e => handleChange(e)}></input>
                <label>Minimum Weight (kilograms in numbers):</label>
                <input type='number' name='weightMin' value={dog.weightMin} onChange={e => handleChange(e)}></input>
                <label>Maximum Weight (kilograms in numbers):</label>
                <input type='number' name='weightMax' value={dog.weightMax} onChange={e => handleChange(e)}></input>
                <label>Life Span (years in numbers):</label>
                <input type='number' name='lifeSpan' value={dog.lifeSpan} onChange={e => handleChange(e)}></input>

                <label>Temperaments</label>
                <select name='temperaments' onChange={e => handleSelect(e)}>
                    <option>Select</option>
                    {temperaments?.sort((a, b) => {
                        if ((a.name < b.name) || (a.name || b.name) === '') return -1
                        if (a.name > b.name) return 1
                        return 0
                    }).map((temp) => {
                        return (
                            <option key={temp.id} value={temp.name}>{temp.name}</option>)
                    })
                    }
                </select>

                {/* <span>{dog.temperaments.map(temp => temp + ', ')}</span> */}

                {dog.temperaments.map(el => {
                    return (
                        <div className='temp-select' key={el}>
                            <div>
                                <p className='temp-p'><strong>{el}</strong></p></div>
                            <div>
                                <button onClick={() => handleDeleteTemperament(el)} className='x' >x</button>
                            </div>
                        </div>
                    )
                })}

                <label>Image</label>
                <input type='file' name='image' value={dog.image} onChange={e => handleChange(e)}></input>
                <fieldset>
                    <button type='submit' className='btn-form-create'>Create Dog</button>
                </fieldset>
                <fieldset>
                    <Link to='/home'>
                        <button className='btn-form-back'>Go back</button>
                    </Link>
                </fieldset>
            </form>
        </div>
    )
}

//onChange={handleSelect}