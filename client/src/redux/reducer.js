import { GET_DETAILS, GET_DOGS } from './actions'

const initialState = {
    dogs: [],
    details: []
};

export default function rootReducer(state = initialState, action){
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload
            };
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        default: 
            return {
                ...state
            }
    }
}