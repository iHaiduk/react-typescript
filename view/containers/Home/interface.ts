import {ICountModel} from "_reducer/count";
import {Map} from "immutable";

export interface IHelloProps {
    compiler?: string;
    framework?: string;
    count: Map<any, ICountModel>;
}
