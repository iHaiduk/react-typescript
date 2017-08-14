"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Home_1 = require("_containers/Home");
var Test_1 = require("_containers/Test");
var React = require("react");
var react_router_1 = require("react-router");
var Routes = function () { return (<react_router_1.Switch>
        <react_router_1.Route exact={true} path="/" component={Home_1.Home}/>
        <react_router_1.Route path="/test" component={Test_1.Test}/>
</react_router_1.Switch>); };
var App = function (props) {
    return React.createElement(react_router_1.StaticRouter, props, React.createElement(Routes, null));
};
var AppComponent = process.env.BROWSER ? App : App;
exports.default = AppComponent;
