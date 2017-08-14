import {PureComponent} from "_components/PureComponent";
import {blockStyle, block, section} from "_style";
import * as React from "react";
import {IHeader} from "./interface";

@blockStyle
export class Header extends React.Component<IHeader, undefined> {

    public render() {
        return (
            <PureComponent tag="header" className={[section.section, block.header]}>
                {this.props.children}
                Header
            </PureComponent>
        );
    }
}
