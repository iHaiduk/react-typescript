import makeId from "_utils/makeid";
import * as bytes from "bytes";
import * as pino from "pino";
import config, {logConfig} from "./config";

const log = pino({...logConfig, name: "Logger"}, config.pretty);
const Counter = require("passthrough-counter");
const humanize = require("humanize-number");

const time = (start: number, enableDelta = true) => {
    const delta = enableDelta ? Date.now() - start : start;
    return humanize(delta < 10000
        ? delta + "ms"
        : Math.round(delta / 1000) + "s");
};

const isLog = (logPino: any, idRequest: string, ctx: any, start: number, len: any, err: any, event?: any) => {
    const status: number = err
        ? (err.isBoom ? err.output.statusCode : err.status || 500)
        : (ctx.status || 404);

    let length: string;
    if ([204, 205, 304].indexOf(status) >= 0) {
        length = "";
    } else if (len == null) {
        length = "-";
    } else {
        length = bytes(len).toLowerCase();
    }

    const type: string = err ? "error"
        : event === "close" ? "warning"
            : "info";

    const summaryTime: number = time(start);

    logPino.debug("Request ANSWER", {
        id: idRequest,
        endTime: Date.now(),
        method: ctx.method,
        url: ctx.originalUrl,
        length,
        summaryTime,
        connection: ctx.header.connection,
        userAgent: ctx.header["user-agent"],
        referer: ctx.header.referer,
    });
    logPino[type]("Request ANSWER", ctx.method, "-->", ctx.originalUrl, status, summaryTime, length);

};

interface ILogger {
    logPino?: any;
    enable?: boolean;
}

export const logger = ({logPino = log, enable = true}: ILogger) => {

    return async (ctx?: any, next?: () => void) => {
        try {
            if (enable === false) {
                return await next();
            }

            const start: number = Date.now();
            const clientIp: string | string[] = ctx.ips.length > 0 ? ctx.ips[ctx.ips.length - 1] : ctx.ip;
            const idRequest: string = makeId() + start;

            logPino.debug("Request GET", {
                id: idRequest,
                startTime: start,
                method: ctx.method,
                url: ctx.originalUrl,
                ip: clientIp,
                connection: ctx.header.connection,
                userAgent: ctx.header["user-agent"],
                referer: ctx.header.referer,
            });
            logPino.info("Request GET", ctx.method, "<--", ctx.originalUrl, clientIp);

            try {
                await next();
            } catch (error) {
                log.error(error);
                isLog(logPino, idRequest, ctx, start, null, error);
            }

            const length: number = ctx.response.length;
            const body: any = ctx.body;
            let counter: any;

            if (length == null && body && body.readable) {
                ctx.body = body
                    .pipe(counter = Counter())
                    .on("error", ctx.onerror);
            }

            const res = ctx.res;

            const done = (event: Event) => {
                res.removeListener("finish", onFinish);
                res.removeListener("close", onClose);
                isLog(logPino, idRequest, ctx, start, counter ? counter.length : length, null, event);
            };

            const onFinish = done.bind(null, "finish");
            const onClose = done.bind(null, "close");

            res.once("finish", onFinish);
            res.once("close", onClose);
        } catch (error) {
            log.error(error);
            ctx.body = error;
            return ctx.status = error.status || 500;
        }
    };
};

export default logger;
