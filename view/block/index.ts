import {ErrorComponent} from "_components/ErrorComponent";
import LazyLoadComponent from "_components/LazyLoadComponent";
import {LoadingComponent} from "_components/LoadingComponent";
declare const System: { import: (path: string) => Promise<any>; };

let Header: any;
if (process.env.BROWSER) {
   Header = LazyLoadComponent(() => System.import("./Header"), LoadingComponent, ErrorComponent);
} else {
   Header = require("./Header").default;
}
export {
    Header,
};
