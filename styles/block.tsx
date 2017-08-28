import * as React from "react";
import {Helmet} from "react-helmet";

const ASSETS: any = (process.env.BROWSER ? (window as any).ASSETS : require("_config").ASSETS) || {};

declare interface IBlock {
    header: string;
}

export const block: IBlock = (require as any)("./block.scss");

export const blockStyle = (Elem: any): any => {

    return class BlockStyle extends React.Component {

        public render() {
            const {children, ...other} = this.props;
            return (
                <Elem {...other}>
                    <Helmet>
                        <link href={`/${ASSETS["block.css"] || "style/block.css"}`} media="all" rel="stylesheet" />
                    </Helmet>
                    {children}
                </Elem>
            );
        }
    };
};
