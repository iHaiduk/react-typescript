import { combineReducers } from "redux";
import count from "./count";
import routing from "./routing";

export default combineReducers({
    count,
    routing: process.env.BROWSER ? routing : null,
});

export interface IActive {
    type: string;
    data: any;
    payload: any;
}
