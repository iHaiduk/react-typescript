import {createBrowserHistory, History} from "history";

export const LOCATION_CHANGE = "router.LOCATION_CHANGE";

let Reducer: any;
export let history: History;

if (process.env.BROWSER) {

    history = createBrowserHistory();

    /**
     * This is our custom change to work with React Router v4. The differences is
     * that the reducer gets its initial state from history and the state shape
     * is slightly different
     */
    const createReducer = (historyReducer: History) => {
        const initState = {
            action: historyReducer.action,
            location: historyReducer.location,
        };
        return function reducer(state = initState, action: any) {
            if (action.type === LOCATION_CHANGE) {
                return {
                    action: action.payload.action,
                    location: action.payload.location,
                };
            }

            return state;
        };
    };
    Reducer = createReducer(history);
}

interface IRoute {
    type: string;
    payload?: {
        location: string;
    };
    data?: any;
}

const route = (prevState = {location: "/"}, action: IRoute) => {
    const {type, payload} = action;

    return (() => {
        switch (type) {
            case LOCATION_CHANGE:
                return {...prevState, location: payload.location};
            default:
                return prevState;
        }
    })();
};
export default route;
