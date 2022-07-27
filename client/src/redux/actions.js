import axios from "axios";

export const GET_DOGS = "getDogs";
export const GET_DETAILS = "getDetails";
export const GET_TEMPERAMENTS = "getTemperaments";
export const FILTER_BY_TEMPS = "filterByTemps";

export function getDogs(name) {
  return async (dispatch) => {
    try {
      if (name) {
        return await axios
          .get("http://localhost:3001/dogs?name=" + name)
          .then((response) =>
            dispatch({ type: GET_DOGS, payload: response.data })
          );
      }
      return await axios
        .get("http://localhost:3001/dogs")
        .then((response) =>
          dispatch({ type: GET_DOGS, payload: response.data })
        );
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/dogs/" + id);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      return await axios
        .get("http://localhost:3001/temperaments")
        .then((response) =>
          dispatch({ type: GET_TEMPERAMENTS, payload: response.data })
        );
    } catch (error) {
      console.log(error);
    }
  };
}

export function filterByTemps(payload) {
  return {
    type: FILTER_BY_TEMPS,
    payload,
  };
}
