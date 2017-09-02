import {PureComponent} from "_components/PureComponent";
import {block, blockStyle, section} from "_style";
import {List} from "immutable";
import * as React from "react";
import {IHeader} from "./interface";

@blockStyle
export class Header extends React.Component<IHeader, undefined> {

    public render() {
        const styleList = List([section.get("section"), block.get("header")]).toJS();
        return (
            <PureComponent tag="header" className={styleList}>
                {this.props.children}
                Header
            </PureComponent>
        );
    }
}
