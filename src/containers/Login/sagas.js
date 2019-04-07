import { call, put, takeLatest } from 'redux-saga/effects';
import actions from './actions';
import api from '../../services/api';

export function* login({ payload }) {
  try {
    const { data: { user } } = yield call(api.login, payload);
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

export default function* loginSagas() {
  yield takeLatest(actions.triggerLogin.type, login);
}