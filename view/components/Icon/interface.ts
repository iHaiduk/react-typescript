import {ReactNode} from "react";

type ClassValue = string | number | ClassArray | undefined | null | false;
interface ClassArray extends Array<ClassValue> { }

export interface IPureComponent {
    ref?: void;
    inputRef?: void;
    children?: ReactNode;
    tag?: string;
    className?: ClassValue;
}
