import * as Koa from "koa";
import * as Router from "koa-router";
import {resolve} from "path";
import * as pino from "pino";
import config, {logConfig} from "./config";
import cookies from "./helpers/cookies";
import routing from "./router";

import "./db/dBase";

const log = pino({...logConfig, name: "Server"}, config.pretty);
const app = new Koa();

app.use(cookies({
    httpOnly: true,
    maxAge: 60 * 60, // 1 hour
}));
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        log.error(error);
        ctx.body = error;
        return ctx.status = error.status || 500;
    }
});

if (typeof process.env.STATIC_PATH === "string") {
    const serve = require("koa-static");
    const staticPath = resolve(process.env.STATIC_PATH);
    log.info("Public folder:", staticPath);
    app.use(serve(staticPath));
}

routing.call(routing, app, new Router());

export default app;
