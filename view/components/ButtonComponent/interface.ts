import {classNames} from "_style";
import {ReactNode} from "react";

export interface IButtonComponent {

    disabled?: boolean;
    name?: string;
    readonly type?: "button" | "submit" | "reset";
    readonly role?: null | "link" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "radio";

    children?: ReactNode;
    className?: classNames;

    icon?: string;
    iconClass?: classNames;

    title: string;
    titleClass?: classNames;
}
