import {IImageCustomParams} from "_components/ImageComponent/interface";
import * as React from "react";

export const Source: React.SFC<IImageCustomParams> = ({src, media}) => {
    return <source srcSet={src} media={media}/>;
};
