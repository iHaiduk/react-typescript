import * as Cookies from "cookie";
import {Context} from "koa";

const cookie = (options?: ISetOption): (ctx: Context, next: () => null) => void => {

    return async (ctx: Context, next: () => null) => {
        class Cookie {
            private ctx: Context;
            private options: any;
            private cookies: any;

            constructor(ctx: Context, options?: ISetOption) {
                this.ctx = ctx;
                this.options = options || {};
                this.cookies = {...this.ctx.cookies};
            }

            public get(name: string, opts?: IGetOption): any {
                const cookieHeader = this.ctx.headers.cookie || "";
                const cokies = Cookies.parse(cookieHeader) || {};
                return cokies[name] != null ? this.decode(cokies[name]) : null;
            }

            public async set(name: string, value: any, opts?: ISetOption): Promise<any> {
                this.cookies.set(name, this.encode(value), {...this.options, opts});
            }

            private decode(data: string): any {
                const body = new Buffer(data, "base64").toString("utf8");
                const json = JSON.parse(body);
                return json;
            }

            private encode(data: string): string {
                const body: string = JSON.stringify(data);
                const buff: Buffer = new Buffer(body);
                return buff.toString("base64");
            }
        }

        ctx.cookies = {...ctx.cookies, ...(new Cookie(ctx, options))};
        await next();
    };

};

export default cookie;

interface IGetOption {
    signed: boolean;
}

interface ISetOption {
    /**
     * a number representing the milliseconds from Date.now() for expiry
     */
    maxAge?: number;
    /**
     * a Date object indicating the cookie's expiration
     * date (expires at the end of session by default).
     */
    expires?: Date;
    /**
     * a string indicating the path of the cookie (/ by default).
     */
    path?: string;
    /**
     * a string indicating the domain of the cookie (no default).
     */
    domain?: string;
    /**
     * a boolean indicating whether the cookie is only to be sent
     * over HTTPS (false by default for HTTP, true by default for HTTPS).
     */
    secure?: boolean;
    /**
     * "secureProxy" option is deprecated; use "secure" option, provide "secure" to constructor if needed
     */
    secureProxy?: boolean;
    /**
     * a boolean indicating whether the cookie is only to be sent over HTTP(S),
     * and not made available to client JavaScript (true by default).
     */
    httpOnly?: boolean;
    /**
     * a boolean indicating whether the cookie is to be signed (false by default).
     * If this is true, another cookie of the same name with the .sig suffix
     * appended will also be sent, with a 27-byte url-safe base64 SHA1 value
     * representing the hash of cookie-name=cookie-value against the first Keygrip key.
     * This signature key is used to detect tampering the next time a cookie is received.
     */
    signed?: boolean;
    /**
     * a boolean indicating whether to overwrite previously set
     * cookies of the same name (false by default). If this is true,
     * all cookies set during the same request with the same
     * name (regardless of path or domain) are filtered out of
     * the Set-Cookie header when setting this cookie.
     */
    overwrite?: boolean;
}
