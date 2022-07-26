import axios from "axios";

export const GET_DOGS = "getDogs";
export const GET_DETAILS = "getDetails";

export function getDogs(name) {
  return async (dispatch) => {
    try {
      if (name) {
        return await axios
          .get('http://localhost:3001/dogs?name=' + name)
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
        var json = await axios.get('http://localhost:3001/dogs/' + id);
        return dispatch({
            type: GET_DETAILS,
            payload: json.data
        })
    } catch (err) {
        console.log(err)
    }
}
}
