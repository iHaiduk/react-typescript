import * as React from "react";

export class IconComponent extends React.PureComponent<any, undefined> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        const {name} = this.props;

        const icon = require("_static/icon/" + name + ".svg").default as any;

        console.log(icon);

        return <svg viewBox={icon.viewBox}>
            <use xlinkHref={`#${icon.id}`} />
        </svg>;
    }
}
