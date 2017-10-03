import * as React from "react";
import {Router} from "react-router-dom";
export interface IApp {
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
