import * as React from "react";
import {Helmet} from "react-helmet";

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
                        <link href="/style/base.css" media="all" rel="stylesheet" />
                        <link href="/style/section.css" media="all" rel="stylesheet" />
                    </Helmet>
                </Elem>
            );
        }
    };
};
