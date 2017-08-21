import * as React from "react";
import {Helmet} from "react-helmet";

const ASSETS: any = process.env.BROWSER ? (window as any).ASSETS : require("_server/router/document").ASSETS;

declare interface IBlock {
    header: string;
}

export const block: IBlock = (require as any)("./block.scss");

export const blockStyle = (Elem: any): any => {

    return class BlockStyle extends React.Component {

        public render() {
            return (
                <Elem>
                    {this.props.children}
                    <Helmet>
                        <link href={`/${ASSETS["block.css"] || "style/block.css"}`} media="all" rel="stylesheet" />
                    </Helmet>
                </Elem>
            );
        }
    };
};
