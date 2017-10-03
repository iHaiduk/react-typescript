import {ErrorComponent} from "_components/ErrorComponent";
import LazyLoadComponent from "_components/LazyLoadComponent";
import {LoadingComponent} from "_components/LoadingComponent";
import * as React from "react";
import {Route, Switch} from "react-router";
declare const System: { import: (path: string) => Promise<any>; };
const Home = LazyLoadComponent(() => System.import("_containers/Home"), LoadingComponent, ErrorComponent);
const Test = LazyLoadComponent(() => System.import("_containers/Test"), LoadingComponent, ErrorComponent);
export const Routes = () => (
   <Switch>
       <Route exact={true} path="/" component={Home}/>
       <Route path="/test" component={Test}/>
   </Switch>);

export default Routes;
