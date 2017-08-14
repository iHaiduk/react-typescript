import reducers from "_reducers";
import { applyMiddleware, createStore, GenericStoreEnhancer } from "redux";
import promise from "redux-promise-middleware";
import thunk from "redux-thunk";
import {history as rHistory} from "./reducers/routing";

export let store: any;

if (process.env.BROWSER) {
    const middleArr = [applyMiddleware(promise()), applyMiddleware(thunk)];
    let enhancerStore = [];

    if (process.env.NODE_ENV !== "production") {
        const {composeWithDevTools} = require("remote-redux-devtools");
        const devToolsExtension: GenericStoreEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION__ ?
            (window as any).__REDUX_DEVTOOLS_EXTENSION__() : (f) => f;
        const composeEnhancers = composeWithDevTools();
        middleArr.push(applyMiddleware(require("redux-logger").default));
        const composeEnhancers2 = (window as any).__REDUX_DEVTOOLS_EXTENSION__ || require("redux").compose;
        const enhancer = composeEnhancers2(...middleArr);
        enhancerStore = [devToolsExtension, composeEnhancers(), enhancer];
    } else {
        enhancerStore = middleArr;
    }

    const initialState = (window as any).__initialState__ || {};

    store = createStore(reducers(), initialState, ...enhancerStore);
} else {
    const moize = require("moize");
    const initStore = (initialState: any = {}) => createStore(reducers(), initialState);
    store = (moize as any)(initStore);
}

export default store;
export const history = rHistory;
