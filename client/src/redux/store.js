import { legacy_createStore as createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer";
import thunk from "redux-thunk"; // sirve para hacer los llamados asincronos

const composeEnhanrse = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhanrse(applyMiddleware(thunk)),
)

export default store;