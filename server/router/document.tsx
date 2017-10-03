import Store from "_store";
import * as React from "react";
import {Helmet} from "react-helmet";
import {Provider} from "react-redux";
import * as serialize from "serialize-javascript";
import Routes from "./../../route/backendRoute";
const { renderToNodeStream, renderToStaticMarkup } = require("react-dom/server");
//
interface IpropertyRender {
    location: string;
    context: any;
}

const ASSETS: any = process.env.BROWSER ? (window as any).ASSETS : require("_config").ASSETS;
// const sprite: string = fs.readFileSync(resolve("dist/public/sprite.svg"), "utf-8");

export const HTMLStart = (): React.ReactElement<{}> => {
    const helmet = Helmet.renderStatic();
    return (
        <head>
            {helmet.title.toComponent()}
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
            {helmet.meta.toComponent()}
            <link href={`/${ASSETS["base.css"] || "style/base.css"}`} media="all" rel="stylesheet" />
            <link href={`/${ASSETS["section.css"] || "style/section.css"}`} media="all" rel="stylesheet" />
            <link href={`/${ASSETS["block.css"] || "style/block.css"}`} media="all" rel="stylesheet" />
            <link href={`/${ASSETS["components.css"] || "style/components.css"}`} media="all" rel="stylesheet" />
            {helmet.link.toComponent()}
        </head>
    );
};

const ChildrenRender = (props?: IpropertyRender): any => {

    const store = Store(props.context);

    return React.createElement(
        Provider,
        {store},
        React.createElement((Routes as any), props),
    );
};

export const render: (ctx: any, location: string, context: any) => string = (ctx: any, location: string, context: any = {}) => {
    let stream: any = "";

    if (process.env.NODE_ENV === "production") {
        ctx.status = 200;
        ctx.type = "text/html; charset=utf-8";
        ctx.set("Cache-Control", "no-cache");
        ctx.set("Connection", "keep-alive");
        ctx.set("Transfer-Encoding", "gzip, chunked");

        ctx.res.write(`<!doctype html><html manifest="/appcache/manifest.appcache">`);
        ctx.res.write(renderToStaticMarkup(React.createElement(HTMLStart)));
        ctx.res.write(`<body><span id="svgContainer"></span><div id="application">`);

        stream = renderToNodeStream(ChildrenRender(context));
        stream.on("end", () => {
            ctx.res.write("</div>");
            ctx.res.write(`<script type="text/javascript">window.__initialState__=${serialize(context)}</script>`);
            ctx.res.write(`<script type="text/javascript">window.ASSETS=${JSON.stringify(ASSETS)}</script>`);
            ctx.res.write(`<script src="${ASSETS["vendor.js"] || "vendor.js"}" type="text/javascript"></script>`);
            ctx.res.write(`<script src="${ASSETS["style.js"] || "style.js"}" type="text/javascript"></script>`);
            ctx.res.write(`<script src="${ASSETS["bundle.js"] || "bundle.js"}" type="text/javascript"></script>`);
            ctx.res.write("</body></html>");
            ctx.res.end();
        });
    } else {
        stream += `<!doctype html><html manifest="/appcache/manifest.appcache">`;
        stream += renderToStaticMarkup(React.createElement(HTMLStart));
        stream += `<body><span id="svgContainer"></span><div id="application">`;
        stream += renderToStaticMarkup(ChildrenRender(context));
        stream += "</div>";
        stream += `<script type="text/javascript">window.__initialState__=${serialize(context)}</script>`;
        stream += `<script type="text/javascript">window.ASSETS=${JSON.stringify(ASSETS)}</script>`;
        stream += `<script src="${ASSETS["vendor.js"] || "vendor.js"}" type="text/javascript"></script>`;
        stream += `<script src="${ASSETS["style.js"] || "style.js"}" type="text/javascript"></script>`;
        stream += `<script src="${ASSETS["bundle.js"] || "bundle.js"}" type="text/javascript"></script>`;
        stream += "</body></html>";
    }

    return stream;
};
