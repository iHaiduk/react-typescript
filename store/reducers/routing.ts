import {createBrowserHistory, History} from "history";

export const LOCATION_CHANGE = "router.LOCATION_CHANGE";
export let history: History;

if (process.env.BROWSER) { history = createBrowserHistory(); }

interface IRoute {
    type: string;
    payload?: {
        location: string;
    };
    data?: any;
}

const route = (state = {location: "/"}, action: IRoute) => {
    const {type, data} = action;

    return (() => {
        switch (type) {
            case LOCATION_CHANGE:
                return {...state, location: data.location};
            default:
                return state;
        }
    })();
};
export default route;
