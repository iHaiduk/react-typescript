import store from "_store";
import {CLICK} from "../constants";
const {dispatch} = store;

export const changeCount = () => dispatch({ type: CLICK });
