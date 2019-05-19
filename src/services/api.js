import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3015/api';

const auth = user_id => {
  axios.defaults.params = { user_id };
};

export default {
  auth,
  login: params => axios.post('/usuarios/login', params),
  usuarios: {
    list: page => axios.get('/usuarios', { params: { page } }),
    delete: id => axios.delete(`/usuarios/${id}`),
    create: params => axios.post('/usuarios', params),
  },
  categorias: {
    list: () => axios.get('/categoria'),
    get: id => axios.get(`/categoria/${id}`)
  },
  subcategorias: {
    list: (page, categoria) => axios.get(`/subcategoria`, { params: { page, categoria } }),
    create: params  => axios.post('/subcategoria', params),
    delete: id => axios.delete(`/subcategoria/${id}`)
  },
  etiquetas: {
    list: nombre => axios.get('/etiqueta', { params: { nombre } }),
  },
  objetos: {
    create: params => axios.post('/objetos', params),
    listDonate: page => axios.get('/objetos/release', { params: { page } }),
    release: params => axios.post('/objetos/release', params),
    find: (page, params = {}) => axios.get('/objetos', { params: { page, ...params } })
  },
  estados: {
    list: () => axios.get('/estado'),
  },
  tiposUsuarios: {
    list: () => axios.get('/tipo-usuario')
  }
}