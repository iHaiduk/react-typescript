import {Source} from "_components/ImageComponent/source";
import {component} from "_style";
import * as cx from "classnames";
import {List} from "immutable";
import * as React from "react";
import {IImageComponent} from "./interface";

const defaultSizes = [
    {
        name: "2k",
        media: "(min-width: 1921px)",
    }, {
        name: "full",
        media: "(min-width: 1601px) and (max-width: 1920px)",
    }, {
        name: "plus",
        media: "(min-width: 1367px) and (max-width: 1600px)",
    }, {
        name: "hd",
        media: "(min-width: 1025px) and (max-width: 1366px)",
    }, {
        name: "xga",
        media: "(min-width: 769px) and (max-width: 1024px)",
    }, {
        name: "wide",
        media: "(min-width: 481px) and (max-width: 768px)",
    }, {
        name: "half",
        media: "(max-width: 480px)",
    },
];

export class ImageComponent extends React.PureComponent<IImageComponent, undefined> {

    public static defaultProps: IImageComponent = {
        className: component.image,
        src: null,
        alt: "",
    };

    public componentDidMount() {
        if (process.env.BROWSER) {
            const picturefill = require("picturefill");
            picturefill();
        }
    }

    public render() {
        const {className, custom, src, imgSrc, alt, ones, ...otherProps} = this.props;
        const classes = cx(component.image, className);

        const img = imgSrc || src && require(`_images/${src}`);
        const images = ones !== true && src && defaultSizes.map((prop) => ({...prop, link: require(`_images/${prop.name}/${src}`)})) || [];

        if (imgSrc) {
            return (
                <picture className={classes} {...otherProps}>
                    {List.isList(custom) && custom.map((props, key) => <Source key={key} {...props} />).toArray()}
                    <img srcSet={img} alt={alt}/>
                </picture>
            );
        } else {
            return !!src && (
                <picture className={classes} {...otherProps}>
                    {ones !== true && images.map(({media, name, link}, key) => <Source key={key} src={link} media={media}/>)}
                    <img srcSet={img} alt={alt}/>
                </picture>
            );
        }
    }
}

export default ImageComponent;
