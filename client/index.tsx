import App from "_route";
import store, {history} from "_store";
import * as OfflinePluginRuntime from "offline-plugin/runtime";
import * as React from "react";
import {render} from "react-dom";
import {AppContainer} from "react-hot-loader";
import {Provider} from "react-redux";

import {changeRoute} from "_actions";
import "./socket";

if (process.env.NODE_ENV === "production") {
    OfflinePluginRuntime.install();
}

const renderApplication = (Component: any) => {
    render(
        <AppContainer>
            <Provider store={store}>
                <Component history={history} {...history}/>
            </Provider>
        </AppContainer>,
        document.getElementById("application"),
    );
};
renderApplication(App);

history.listen(({pathname}: any) => changeRoute({location: pathname}));
