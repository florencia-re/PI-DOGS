import { FILTER_BY_TEMPS, GET_DETAILS, GET_DOGS, GET_TEMPERAMENTS } from './actions'

const initialState = {
    dogs: [],
    allDogs: [],
    details: [],
    temperaments: []
};

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload         //--- para tener siempre disponible en el estado los dogs
            };
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case GET_TEMPERAMENTS:
            return {
                ...state, 
                temperaments: action.payload
            }
        case FILTER_BY_TEMPS:
            const allDogs = state.allDogs
            // const filterDogs = action.payload === 'All' ? allDogs : allDogs.filter(dog => {dog.temperaments.includes(action.payload)}
            const filterDogs = action.payload === 'all' ? allDogs : allDogs.filter(dog => {
                if (typeof (dog.temperaments) === 'string') return dog.temperaments.includes(action.payload);
                // if (Array.isArray(dog.temperaments)) {
                //     let temps = dog.temperaments.map(dog => dog.name);
                //     return temps.includes(action.payload);
                // }
                return true;
            });
            return {
                ...state,
                dogs: filterDogs

            }
        default: 
            return {
                ...state
            }
    }
}