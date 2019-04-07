import { createActions } from 'ractionx';

const prefix = '@inventarioop/containers/Login';

const types = [
  'TRIGGER_LOGIN',
  'TRIGGER_LOGOUT',
  'SET_USER',
  'SET_STATUS'
];

const { triggerLogin, triggerLogout, setUser, setStatus } = createActions(prefix, types);

export default { triggerLogin, triggerLogout, setUser, setStatus };
