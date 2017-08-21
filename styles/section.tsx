import * as React from "react";
import {Helmet} from "react-helmet";

const ASSETS: any = process.env.BROWSER ? (window as any).ASSETS : require("_server/router/document").ASSETS;

declare interface ISection {
    section: string;
}

export const section: ISection = (require as any)("./section.scss");

export const sectionStyle = (Elem: any): any => {

    return class SectionStyle extends React.Component {

        public render() {
            return (
                <Elem>
                    {this.props.children}
                    <Helmet>
                        <link href={`/${ASSETS["base.css"] || "style/base.css"}`} media="all" rel="stylesheet" />
                        <link href={`/${ASSETS["section.css"] || "style/section.css"}`} media="all" rel="stylesheet" />
                    </Helmet>
                </Elem>
            );
        }
    };
};
