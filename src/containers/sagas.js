import { all } from 'redux-saga/effects';
import loginSaga from './Login/sagas';
// Ejemplo:
// import componenteSaga from './carpeta_componente/saga'

export default function* rootSaga() {
  // Agregar al arreglo
  // yield all([componenteSaga()]]);
  yield all([loginSaga()]);
}