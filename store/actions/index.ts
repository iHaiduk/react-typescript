import store from "_store";
import {CLICK, LOCATION_CHANGE} from "../constants";
const {dispatch} = store;

// Routing
export const changeRoute = (payload: any) => dispatch({ payload, type: LOCATION_CHANGE});

// Counter
export const changeCount = () => dispatch({ type: CLICK });
