import {classNames} from "_style";
import {List} from "immutable";
import {ReactNode} from "react";

// interface ImmutableMap<T> extends Map<string, any> {
//     get<K extends keyof T>(name: K): T[K];
// }
//
// export type IImageParams = ImmutableMap<{
//     main: string; // default Image
// }>;

export interface IImageCustomParams {
    src: string; // default Image
    media: string; // (min-width: 1367px) and (max-width: 1920px)
}

export interface IImageComponent {
    children?: ReactNode;
    className?: classNames;
    src?: string;
    imgSrc?: string;
    alt: string;
    custom?: List<IImageCustomParams> | null;
    ones?: true;
}
