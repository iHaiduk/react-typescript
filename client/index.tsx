import App from "_route";
import store, {history} from "_store";
import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import {LOCATION_CHANGE} from "../store/reducers/routing";

import "./socket";

const renderApplication = (Component: any) => {
    render(
        <AppContainer>
            <Provider store={store}>
                <Component history={history} {...history}/>
            </Provider>
        </AppContainer>,
        // HTML root element for React app
        document.getElementById("application"),
    );
};
renderApplication(App);

history.listen((location: any) => {
    store.dispatch({
        payload: {location: location.pathname},
        type: LOCATION_CHANGE,
    });
});
