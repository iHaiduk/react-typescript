import {IBlock, IComponents, ISection} from "_stylesLoad/interface";

const block: IBlock = (require as any)("./block.scss");
const component: IComponents = (require as any)("./components.scss");
const section: ISection = (require as any)("./section.scss");

export { block, component, section };

// Interfaces
interface IClassDictionary {
    [id: string]: boolean | undefined | null;
}
export type classNames = string | number | IClassDictionary | string[] | IClassDictionary[] | undefined | null | false;
