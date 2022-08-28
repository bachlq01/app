import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import count from "./count";
import arrData from "./arrData";

const all = combineReducers({
    count, arrData
});

export default createStore(all, applyMiddleware(thunk));