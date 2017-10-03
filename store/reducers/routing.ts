import {createBrowserHistory, History} from "history";
import {Map} from "immutable";
import {LOCATION_CHANGE} from "../constants";

export let history: History = process.env.BROWSER && createBrowserHistory();

export interface IRoute {
    type: typeof LOCATION_CHANGE;
    payload?: {
        location: string;
    };
    data?: any;
}

const route = (state = Map({location: "/"}), action: IRoute) => {
    const {type, payload} = action;
    state = state instanceof Map && state || Map(state);

    switch (type) {
        case LOCATION_CHANGE:
            return state.set("location", payload.location);
        default:
            return state;
    }
};
export default route;
