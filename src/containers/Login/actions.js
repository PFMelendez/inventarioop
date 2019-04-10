import { createActions } from 'ractionx';

const prefix = '@inventarioop/containers/Login';

const types = [
  'TRIGGER_LOGIN',
  'TRIGGER_LOGOUT',
  'END_LOGOUT',
  'SET_USER',
  'SET_STATUS',
  'AUTO_LOGIN',
  'SET_LOADING'
];

const {
  triggerLogin,
  triggerLogout,
  endLogout,
  setUser,
  setStatus,
  autoLogin,
  setLoading
} = createActions(prefix, types);

export default {
  triggerLogin,
  triggerLogout,
  endLogout,
  setUser,
  setStatus,
  autoLogin,
  setLoading
};
