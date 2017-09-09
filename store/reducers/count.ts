import {IActive} from "_reducers";
import {INCREMENT} from "../constants";

interface ICount {
    type: typeof INCREMENT;
}

type Count = ICount | IActive;

export default (state = 0, {type}: Count) => {
    switch (type) {
        case INCREMENT:
            return state + 1;
        default:
            return state;
    }
};
