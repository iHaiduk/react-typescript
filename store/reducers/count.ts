import {IActive} from "_reducers";
import {Map} from "immutable";
import {INCREMENT} from "../constants";

interface ICount {
    type: typeof INCREMENT;
}

type Count = ICount | IActive;

export interface ICountModel {
    number: number;
}

export default (state = Map({number: 0}), {type}: Count) => {
    switch (type) {
        case INCREMENT:
            const num: number = state.get("number");
            return state.set("number", num + 1);
        default:
            return state;
    }
};
