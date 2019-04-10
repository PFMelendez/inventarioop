import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3015';

const auth = user_id => {
  axios.defaults.params = { user_id };
};

export default {
  auth,
  login: params => axios.post('/usuarios/login', params),
  usuarios: {
    list: () => axios.get('/usuarios'),
  },
  categorias: {
    list: () => axios.get('/categoria'),
  },
  subcategorias: {
    list: categoria => axios.get(`/subcategoria${categoria ? `?categoria=${categoria}` : ''}`),
  },
  etiquetas: {
    list: nombre => axios.get('/etiqueta', { params: { nombre } }),
  },
  objetos: {
    create: params => axios.post('/objetos', params),
  },
  estados: {
    list: () => axios.get('/estado'),
  }
}