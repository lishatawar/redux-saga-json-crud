import * as types from "./actionTypes";
import {
  takeEvery,
  all,
  fork,
  call,
  put,
  delay,
  takeLatest,
  take,
} from "redux-saga/effects";

import {
  createUserApi,
  deleteUserApi,
  loadUserApi,
  updateUserApi,
} from "./api";
import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError,
} from "./actions";

export function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUserApi);
    if (response.status === 200) {
      yield delay(500);
      yield put(loadUsersSuccess(response.data));
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data));
  }
}

export function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload);
    if (response.status === 200) {
      yield delay(500);
      yield put(createUserSuccess(response.data));
    }
  } catch (error) {
    yield put(createUserError(error.response.data));
  }
}

export function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId);
    if (response.status === 200) {
      yield delay(500);
      yield put(deleteUserSuccess(userId));
      yield call(onLoadUsersStartAsync);
    }
  } catch (error) {
    yield put(deleteUserError(error.response.data));
  }
}

export function* onUpdateUserStartAsync({payload: {id, formValue}}) {
  try {
    const response = yield call(updateUserApi, id, formValue);
    if (response.status === 200) {
      yield delay(500);
      yield put(updateUserSuccess(response.data));
      yield call(onLoadUsersStartAsync);
    }
  } catch (error) {
    yield put(updateUserError(error.response.data));
  }
}

export function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync);
}

export function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync);
}

export function* onDeleteUser() {
  while (true) {
    let { payload: userId } = yield take(types.DELETE_USER_START);
    yield call(onDeleteUserStartAsync, userId);
  }
}

export function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync);
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
