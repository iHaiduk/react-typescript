import {block} from "./block";
import {component} from "./components";
import {section, sectionStyle} from "./section";

export {
    block,
    component,
    section,
    sectionStyle,
};

interface IClassDictionary {
    [id: string]: boolean | undefined | null;
}
export type classNames = string | number | IClassDictionary | string[] | IClassDictionary[] | undefined | null | false;
