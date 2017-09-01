import { delay } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";

export function* incrementAsync() {
    yield call(delay, 1000);
    yield put({type: "INCREMENT"});
}

export default function*() {
    yield takeEvery("FETCH_REQUESTED", incrementAsync);
}
