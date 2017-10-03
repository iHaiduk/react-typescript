import {Home} from "_containers/Home";
import {Test} from "_containers/Test";
import {IApp} from "_route";
import * as React from "react";
import {Route, StaticRouter, Switch} from "react-router";

const Routes = () => (
    <Switch>
       <Route exact={true} path="/" component={Home}/>
       <Route path="/test" component={Test}/>
   </Switch>);

const App: React.StatelessComponent<IApp> = (props: any) => {
    return React.createElement(
        StaticRouter,
        {context: props, location: props.routing.location},
        React.createElement(Routes, null),
    );
};
export const AppComponent = process.env.BROWSER ? App : App;
export default AppComponent;
