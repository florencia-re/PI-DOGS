import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { getTemperaments } from '../../redux/actions';

export default function CreateDog() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])
    const temperaments = useSelector(state => state.temperaments)

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
            [e.target.name]: e.taget.value
        })
        console.log(dog)
    }

    // const handleSelect = (e) => {
    //     setDog({
    //         ...
    //     })
    // }

    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <div>
            <form onChange={handleSubmit}>
                <label>Name</label>
                <input name='name' value={dog.name} onChange={handleChange}></input>
                <label>Height Min</label>
                <input name='heightMin' value={dog.heightMin} onChange={handleChange}></input>
                <label>Height Max</label>
                <input name='heightMax' value={dog.heightMax} onChange={handleChange}></input>
                <label>Weight Min</label>
                <input name='weightMin' value={dog.weightMin} onChange={handleChange}></input>
                <label>Weight Max</label>
                <input name='weightMax' value={dog.weightMax} onChange={handleChange}></input>
                <label>Life Span</label>
                <input name='lifeSpan' value={dog.lifeSpan} onChange={handleChange}></input>

                <label>Temperaments</label>
                <select name='temperaments' value={dog.id} onChange={handleChange}>
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

                <label>Image</label>
                <input name='image' value={dog.image} ></input>
            </form>
            <button type='submit' disabled >Create Dog</button>
            <button>Go back</button>
        </div>
    )
}

//onChange={handleSelect}