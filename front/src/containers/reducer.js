import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
// Ejemplo:
// import contenedor from './carpeta/reducer';
// Agregar al cobjeto (separar elementos con ,):
// export default history => combineReducers({
//   router: connectRouter(history),
//   contenedor,
// });

export default history => combineReducers({
  router: connectRouter(history),
});
