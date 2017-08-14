import {Home} from "_containers/Home";
import {Test} from "_containers/Test";
import * as React from "react";
import {Route, StaticRouter, Switch} from "react-router";

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
        StaticRouter,
        props,
        React.createElement(Routes, null),
    );
};
const AppComponent = process.env.BROWSER ? App : App;

export default AppComponent;
