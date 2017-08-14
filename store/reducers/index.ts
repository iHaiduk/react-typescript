import { combineReducers } from "redux";
import routing from "./routing";
import test from "./test";

const reducers = () => {
    return  combineReducers({
        routing: process.env.BROWSER ? routing : null,
        test,
    });
};

export default reducers;