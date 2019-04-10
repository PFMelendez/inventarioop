import { call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import api from '../../services/api';

export function* logIn({ payload }) {
  try {
    const { data: { user } } = yield call(api.login, payload);

    const sessionString = JSON.stringify({ user });
    yield call(localStorage.setItem, 'inventarioopSession', sessionString);
    yield call(api.auth, user.id_usuarios);
    yield put(actions.setUser(user));
    yield put(actions.setStatus(true));
  } catch (err) {
    // API Error Stuff
    console.log(err);
    yield put(actions.setStatus(false));
    alert('Error al hacer login, revise sus credenciales');
  }
}

export function* autoLogin() {
  const sessionString = yield call(localStorage.getItem, 'inventarioopSession');
  if (sessionString) {
    const { user } = JSON.parse(sessionString);
    yield put(actions.setStatus(true));
    yield put(actions.setUser(user));
  } else {
    yield put(actions.setStatus(false));
  }
  yield put(actions.setLoading(false));
}

export function* logOut() {
  yield put(actions.setLoading(true));
  yield call(localStorage.removeItem, 'inventarioopSession');
  yield put(actions.endLogout());
}

export default function* loginSagas() {
  yield takeLatest(actions.triggerLogin.type, logIn);
  yield takeLatest(actions.autoLogin.type, autoLogin);
}