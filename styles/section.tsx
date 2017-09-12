import {ISection} from "_stylesLoad/interface";
import * as React from "react";
import {Helmet} from "react-helmet";

const ASSETS: any = (process.env.BROWSER ? (window as any).ASSETS : require("_config").ASSETS) || {};
export const section: ISection = (require as any)("./section.scss");

export const sectionStyle = (Elem: any): any => {

    return class SectionStyle extends React.Component {

        public render() {
            const {children, ...other} = this.props;
            return (
                <Elem {...other}>
                    <Helmet>
                        <link href={`/${ASSETS["base.css"] || "style/base.css"}`} media="all" rel="stylesheet" />
                        <link href={`/${ASSETS["section.css"] || "style/section.css"}`} media="all" rel="stylesheet" />
                        <link href={`/${ASSETS["block.css"] || "style/block.css"}`} media="all" rel="stylesheet" />
                        <link href={`/${ASSETS["components.css"] || "style/components.css"}`} media="all" rel="stylesheet" />
                    </Helmet>
                    {children}
                </Elem>
            );
        }
    };
};
