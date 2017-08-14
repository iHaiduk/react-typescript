import * as Koa from "koa";
import * as Router from "koa-router";

import {render} from "./document";

const initRoute = (app: Koa, route: Router) => {

    route.get("/", (ctx) => {
        const location = ctx.request.url;

        const data = {
            routing: {location},
        };

        ctx.body = render(location, data);
    });

    route.get("/test", (ctx) => {
        const location = ctx.request.url;

        const data = {
            routing: {location},
        };

        ctx.body = render(location, data);
    });

    app
        .use(route.routes())
        .use(route.allowedMethods());

};

export default initRoute;
