import {classNames} from "_style";
import {ReactNode} from "react";

export interface IIconComponent {
    viewBox?: string;
    name: string;
    spriteName?: string;
    children?: ReactNode;
    className?: classNames;
}
