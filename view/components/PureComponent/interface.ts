import {classNames} from "_style";
import {ReactNode} from "react";

export interface IPureComponent {
    ref?: void;
    inputRef?: void;
    children?: ReactNode;
    tag?: string;
    className?: classNames;
}
