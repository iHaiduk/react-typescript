import {IValueBlocks, IValueElements, IValueMods} from "_stylesLoad/interface";
import {get} from "_utils/just/object-safe-get";

interface IRbem {
    get(): string;
}

const isString = (value: any): boolean => typeof value === "string";

/** Example
 * import {block, section} from "_style";
 * import Rbem from "_utils/rbem";
 *
 * const footer = new Rbem(block, "footer");
 * footer.get() -> footer
 * footer.get("text") -> footer__text
 * footer.get(null, "test") -> footer--test
 * footer.get("text", "my") -> footer__text--my
 */

export class Rbem implements IRbem {
    private style: any;
    private blockName: IValueBlocks;
    private readonly elePrefix: string;
    private readonly modPrefix: string;

    constructor(style: any, blockName: IValueBlocks, elePrefix = "__", modPrefix = "--") {
        this.style = style;
        this.blockName = blockName;
        this.elePrefix = elePrefix;
        this.modPrefix = modPrefix;
        return this;
    }

    public get(element?: IValueElements, modifier?: IValueMods): string {
        let genPath: string = this.blockName;

        if (isString(element)) {
            genPath += this.elePrefix + element;
        }
        if (isString(modifier)) {
            genPath += this.modPrefix + modifier;
        }

        return String(get(this.style, genPath));
    }

}

export default Rbem;
