import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import viewReducer from "./redux/reducers/viewReducer";
import userReducer from './redux/reducers/userReducer';

const rootReduct = combineReducers({
    view: viewReducer,
    userInfo: userReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReduct, composeEnhancer(applyMiddleware(thunk)))

export default store;