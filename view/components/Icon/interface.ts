import {classNames} from "_style";
import {ReactNode} from "react";

export interface IIcon {
    viewBox?: string;
    name: string;
    spriteName?: string;
    children?: ReactNode;
    className?: classNames;
}
