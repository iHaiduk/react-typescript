import * as React from "react";
import {Helmet} from "react-helmet";

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
                        <link href="/style/block.css" media="all" rel="stylesheet" />
                    </Helmet>
                </Elem>
            );
        }
    };
};
