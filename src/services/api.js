import axios from 'axios';

axios.defaults.baseURL = process.emit.API_URL || 'http://localhost:3005/api';

const auth = user_id => {
  axios.defaults.params = { user_id };
};

export default {
  login: params => axios.post('/usuarios/login', params),
  auth
}