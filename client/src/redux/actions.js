import axios from 'axios';

export const GET_DOGS = 'getDogs';

export function getDogs(){
    return async (dispatch) => {
        return await axios.get('http://localhost:3001/dogs')
            .then((response) => {
              dispatch({ 
                type: GET_DOGS, 
                payload: response.data
              })
            }
        )
    }
}


// const getDogs = () => {

// }