import * as React from "react";

export class IconComponent extends React.PureComponent<any, undefined> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        const icon = require("_static/icon/download.svg").default as any;

        console.log(icon);

        return <svg viewBox={icon.viewBox}>
            <use xlinkHref={"#download"} />
        </svg>;
    }
}
