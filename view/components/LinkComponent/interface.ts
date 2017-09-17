import {classNames} from "_style";
import {ReactNode} from "react";

export interface ILinkComponent {
    readonly href: string;

    target?: "_blank" | "_self" | "_parent" | "_top";
    rel?: "alternate" | "author" | "bookmark" | "help" | "license" | "next" | "nofollow" | "noreferrer" | "prefetch" | "prev" | "search" | "tag";

    children?: ReactNode;
    className?: classNames;

    icon?: string;
    iconClass?: classNames;

    title?: string;
    titleClass?: classNames;
}
