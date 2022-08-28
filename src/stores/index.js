import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import count from "./count";
import user from "./user";
import arrData from "./arrData";

const all = combineReducers({
    count, arrData,user
});

export default createStore(all, applyMiddleware(thunk));