import {ILazyLoad, Loader, ReactComponent} from "_components/LazyLoadComponent/interface";
import * as React from "react";

export function LazyLoadComponent<P>(
    loader: Loader,
    loadingComponent?: ReactComponent<{}>,
    errorComponent?: ReactComponent<{}>,
) {

    return class extends React.Component<{}, ILazyLoad<P>> {
        public state: ILazyLoad<P> = {
            Component: null,
            ErrorComponent: errorComponent || null,
            LoadingComponent: loadingComponent || null,
            failed: false,
        };

        public componentWillMount() {
            if (!this.state.Component) {
                loader()
                    .then((module) => module.default || module)
                    .then((Component: ReactComponent<P>) => this.setState({ Component }))
                    .catch((err) => {
                        console.error(err);
                        this.setState({ failed: true });
                    });
            }
        }

        public render() {
            const { Component, LoadingComponent, ErrorComponent, failed } = this.state;

            if (Component) {
                return (
                    <Component {...this.props} />
                );
            }

            if (failed && ErrorComponent) {
                return <ErrorComponent />;
            }

            if (LoadingComponent) {
                return <LoadingComponent />;
            }

            return null;
        }
    };
}

export default LazyLoadComponent;
