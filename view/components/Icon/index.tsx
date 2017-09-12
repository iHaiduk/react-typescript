import request from "_helpers/xhr";
import {component} from "_style";
import * as cx from "classnames";
import * as React from "react";
import {IIcon} from "./interface";

export class IconComponent extends React.PureComponent<IIcon, undefined> {

    public static defaultProps: IIcon = {
        className: component.icon,
        name: null,
        spriteName: "sprite",
        viewBox: "0 0 24 24",
    };

    public async componentDidMount() {
        try {
            if (process.env.BROWSER) {
                const svgContainer = document.getElementById("svgContainer");
                const {spriteName} = this.props;
                if (svgContainer !== null && !svgContainer.children.length) {
                    const result = await request({url: `/${spriteName}.svg`});
                    svgContainer.innerHTML = result;
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    public render() {

        const {name, viewBox, className} = this.props;
        const classes = cx(className);

        return name && (
            <svg viewBox={viewBox} className={classes}>
                <use xlinkHref={`#${name}`}/>
            </svg>
        );
    }
}

export default IconComponent;
