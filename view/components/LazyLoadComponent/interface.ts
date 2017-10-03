import * as React from "react";

export type Loader = () => Promise<any>;

export type ReactComponent<P> = React.ComponentClass<P> | React.SFC<P> | null;

export interface ILazyLoad<P> {
    Component: ReactComponent<P>;
    ErrorComponent: ReactComponent<any>;
    LoadingComponent: ReactComponent<any>;
    failed: boolean;
}
