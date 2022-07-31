import {
  FILTER_BY_ORIGIN,
  FILTER_BY_TEMPS,
  SORT_BY_WEIGHT,
  GET_DETAILS,
  GET_DOGS,
  GET_TEMPERAMENTS,
  SORT_BY_NAME,
} from "./actionTypes";

const initialState = {
  dogs: [],
  allDogs: [],
  details: [],
  temperaments: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload, //--- para tener siempre disponible en el estado los dogs
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload,
      };
    case FILTER_BY_TEMPS:
      const allDogs = state.allDogs;
      const filterDogsByTemps =
        action.payload === "All"
          ? allDogs
          : allDogs.filter((dog) => {
              return dog.temperaments.includes(action.payload);
            });
      return {
        ...state,
        dogs: filterDogsByTemps,
      };
    case FILTER_BY_ORIGIN:
      const allDoggie = state.allDogs;
      const filterDogsByOrigin =
        action.payload === "Created"
          ? state.allDogs.filter((dog) => dog.createdInDb)
          : state.allDogs.filter((dog) => !dog.createdInDb);
      return {
        ...state,
        dogs: action.payload === "All" ? allDoggie : filterDogsByOrigin,
      };
    case SORT_BY_NAME:
      const sortNames =
        action.payload === "Asc" || action.payload === "All"
          ? state.allDogs.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            });
      return {
        ...state,
        dogs: sortNames,
      };

    case SORT_BY_WEIGHT:
      //paso los sting a numero y los comparo
      const sortWeight = action.payload === "Light"
          ? state.dogs.sort(function (a, b) {
              return parseInt(a.weightMin) - parseInt(b.weightMin);
            })
          : state.dogs.sort(function (a, b) {
              return parseInt(b.weightMax) - parseInt(a.weightMax);
            });
      return {
        ...state,
        dogs: action.payload === 'All' ? state.allDogs.sort((a, b) => {
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          return 0;
        }): sortWeight 
      };

    default:
      return {
        ...state,
      };
  }
}
