import * as React from "react";
import {IIcon} from "./interface";

export class IconComponent extends React.PureComponent<IIcon, undefined> {

    public static defaultProps: IIcon = {
        name: null,
        viewBox: "0 0 24 24",
    };

    constructor(props: IIcon) {
        super(props);
    }

    public render() {

        const {name, viewBox} = this.props;

        return name && (
            <svg viewBox={viewBox}>
                <use xlinkHref={`#${name}`}/>
            </svg>
        );
    }
}
