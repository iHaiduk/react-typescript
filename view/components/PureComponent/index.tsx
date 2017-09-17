import * as cx from "classnames";
import * as React from "react";
import {IPureComponent} from "./interface";

export class PureComponent extends React.PureComponent<IPureComponent, undefined> {

    public static defaultProps: IPureComponent = {
        tag: "div",
    };

    constructor(props: IPureComponent) {
        super(props);
    }

    public render() {
        const props = {...this.props};
        const {tag, inputRef, children, className = null} = props;
        const Tag = tag;
        if (Reflect && Reflect.deleteProperty) {
            Reflect.deleteProperty(props, "tag");
            Reflect.deleteProperty(props, "inputRef");
        } else {
            delete props.tag;
            delete props.inputRef;
        }
        Reflect.deleteProperty(props, "inputRef");
        props.className = className && cx(className);
        return <Tag ref={inputRef} {...props}>{children}</Tag>;
    }
}
