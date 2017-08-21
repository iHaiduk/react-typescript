import Store from "_store";
import * as fs from "fs";
import {resolve} from "path";
import * as React from "react";
import {renderToString} from "react-dom/server";
import {Helmet} from "react-helmet";
import {Provider} from "react-redux";
import * as serialize from "serialize-javascript";
import Routes from "./../../route/backendRoute";

interface IpropertyRender {
    location: string;
    context: any;
}

interface IHTMLRender {
    html: string;
    context: any;
}

export const ASSETS: any = process.env.ASSETS;
const sprite: string = fs.readFileSync(resolve("dist/public/sprite.svg"), "utf-8");

export const HTML = ({html = "", context = {}}: IHTMLRender): React.ReactElement<IHTMLRender> => {
    const helmet = Helmet.renderStatic();
    return (
        <html manifest="/appcache/manifest.appcache">
        <head>
            {helmet.title.toComponent()}
            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
        </head>
        <body>
        <span dangerouslySetInnerHTML={{ __html: sprite }}/>
        <div id="application" dangerouslySetInnerHTML={{ __html: html }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(context)}; window.ASSETS=${JSON.stringify(ASSETS)}` }}/>
        <script src={`/${ASSETS["vendor.js"] || "vendor.js"}`} type="text/javascript"/>
        <script src={`/${ASSETS["style.js"] || "style.js"}`} type="text/javascript"/>
        <script src={`/${ASSETS["bundle.js"] || "bundle.js"}`} type="text/javascript"/>
        </body>
        </html>);
};

const ChildrenRender = (props?: IpropertyRender): string => {

    const store = Store(props.context);

    return renderToString(React.createElement(
        Provider,
        {store},
        React.createElement((Routes as any), props),
    ));
};

export const render: (location: string, context: any) => string = (location: string, context: any = {}) => {
    const renderElement = React.createElement(HTML, { html:  ChildrenRender({location, context}), context});
    return "<!doctype html>" + renderToString(renderElement);
};
