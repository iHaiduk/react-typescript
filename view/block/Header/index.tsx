import {PureComponent} from "_components/PureComponent";
import {block, section} from "_style";
import * as React from "react";
import {IHeader} from "./interface";

export class Header extends React.Component<IHeader, undefined> {

    public render() {
        const styleList = [section.section, block.header];
        return (
            <PureComponent tag="header" className={styleList}>
                {this.props.children}
                Header
            </PureComponent>
        );
    }
}
