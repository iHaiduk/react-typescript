import * as React from "react";
import {Router} from "react-router-dom";
// import clientRoute from "./clientRoute";

interface IApp {
    action: any;
    listen: (location: any) => any;
    location: string;
    children?: React.ReactNode;
}
let AppComponent: any;

if (process.env.NODE_ENV === "production") {

    const App: React.StatelessComponent<IApp> = (props) => {
        return React.createElement(
            Router,
            props as any,
            React.createElement(require("./clientRoute").default, null),
        );
    };
    AppComponent = App;

} else {
    const {Route, Switch} = require("react-router");
    const Routes = () => (
        <Switch>
            <Route exact={true} path="/" component={require("_containers/Home").Home}/>
            <Route path="/test" component={require("_containers/Test").Test}/>
        </Switch>
    );

    const App: React.StatelessComponent<IApp> = (props) => {
        return React.createElement(
            Router,
            props as any,
            React.createElement(Routes, null),
        );
    };

    AppComponent = App;
}

export default AppComponent;

/*
import {Home} from "_containers/Home";
import {Test} from "_containers/Test";
import * as React from "react";
import {Route, Switch} from "react-router";
import {Router} from "react-router-dom";

// console.log(import("_containers/Home"))

const Routes = () => (
    <Switch>
        <Route exact={true} path="/" component={Home}/>
        <Route path="/test" component={Test}/>
    </Switch>
);

interface IApp {
    action: any;
    listen: (location: any) => any;
    location: string;
    children?: React.ReactNode;
}

const App: React.StatelessComponent<IApp> = (props) => {
    return React.createElement(
        Router,
        props as any,
        React.createElement(Routes, null),
    );
};
const AppComponent = process.env.BROWSER ? App : App;

export default AppComponent;
 */
