import request from "_helpers/xhr";
import * as React from "react";
import {IIcon} from "./interface";

export class IconComponent extends React.PureComponent<IIcon, undefined> {

    public static defaultProps: IIcon = {
        name: null,
        spriteName: "sprite",
        viewBox: "0 0 24 24",
    };

    constructor(props: IIcon) {
        super(props);
    }

    public async componentDidMount() {
        if (process.env.BROWSER) {
            const svgContainer = document.getElementById("svgContainer");
            const {spriteName} = this.props;
            if (svgContainer !== null && !svgContainer.children.length) {
                const result = await request({url: `/${spriteName}.svg`});
                svgContainer.innerHTML = result;
            }
        }
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

export default IconComponent;