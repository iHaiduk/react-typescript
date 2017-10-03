import { combineEpics } from "redux-observable";
import {addCount} from "./counter";

export default combineEpics(
    addCount,
);
