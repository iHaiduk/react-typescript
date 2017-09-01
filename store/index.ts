import reducers from "_reducers";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import {history as rHistory} from "./reducers/routing";
import rootSaga from "./sagas";

export let store: any;
export let action: any;
export let createStoreWithMiddleware: any;

if (process.env.BROWSER) {
    createStoreWithMiddleware = (data = (window as any).__initialState__) => {
        const sagaMiddleware = createSagaMiddleware();

        const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        store = createStore(reducers, data, composeEnhancers(
            applyMiddleware(sagaMiddleware),
        ));

        sagaMiddleware.run(rootSaga);
        return store;
    };
    action = (type: string, data: any) => store.dispatch({type, data});

} else {
    const moize = require("moize");
    const initStore = (initialState: any = {}) => createStore(reducers, initialState);
    store = (moize as any)(initStore);
    createStoreWithMiddleware = store;
}

export default createStoreWithMiddleware;
export const history = rHistory;
