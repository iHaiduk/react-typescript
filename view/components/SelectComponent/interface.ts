import {classNames} from "_style";
import {List} from "immutable";
import {ReactNode} from "react";

interface ISelectOption {
    label: string;
    value: string;
}

export interface ISelectComponent {
    className?: classNames;
    // name: string;
    options?: List<ISelectOption>;
    creatable?: boolean;
    children?: ReactNode;
}
