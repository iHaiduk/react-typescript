
import { Epic } from "redux-observable";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/take";
import {CLICK, INCREMENT} from "../constants";

interface ICounterAction {
    type: typeof CLICK | typeof INCREMENT;
}

interface IMyState {
    a: number;
}

export const addCount: Epic<ICounterAction, IMyState> = (action$) =>
    action$.ofType(CLICK)
        .debounceTime(500)
        .distinctUntilChanged()
        .take(3)
        .mapTo<ICounterAction, any>({type: INCREMENT});
