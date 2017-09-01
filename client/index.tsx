import App from "_route";
import createStoreWithMiddleware, {action, history} from "_store";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";
import {LOCATION_CHANGE} from "../store/reducers/routing";

import "./socket";

if (process.env.NODE_ENV === "production") {
    OfflinePluginRuntime.install();
}

const store = createStoreWithMiddleware();

const renderApplication = () => {
    render(
        <AppContainer>
            <Provider store={store}>
                <App history={history} {...history}/>
            </Provider>
        </AppContainer>,
        document.getElementById("application"),
    );
};

renderApplication();
store.subscribe(renderApplication);

history.listen((location: any) => {
    action(LOCATION_CHANGE, {location: location.pathname});
});