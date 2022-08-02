import axios from "axios";
import {
  GET_DOGS,
  GET_DETAILS,
  GET_TEMPERAMENTS,
  FILTER_BY_TEMPS,
  FILTER_BY_ORIGIN,
  SORT_BY_WEIGHT,
  SORT_BY_NAME,
  //POST_DOG
} from "./actionTypes";

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
  //el payload es el value de la option en el select
  return {
    type: FILTER_BY_TEMPS,
    payload,
  };
}

export function filterByOrigin(payload) {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
}

export function sortByName(payload) {
  return {
    type: SORT_BY_NAME,
    payload,
  };
}

export function sortByWeight(payload) {
  return {
    type: SORT_BY_WEIGHT,
    payload,
  };
}

export function postDog(payload) {
  return async function (dispatch) {
     const response = await axios.post("http://localhost:3001/dogs", payload);
     console.log(response)
     return response 
  }
}
     // return {
      //   type: POST_DOG,
      //   json,
      // };
    // } catch (error) {
    //   console.log("Error ocurred");
    //   //payload({type: ERROR_OCURRED, payload: error.toString()})
    // }
