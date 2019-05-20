import axios from 'axios';
import tofd from 'tofd';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3015/api';

const auth = userId => {
  axios.defaults.params = { userId };
};

export default {
  auth,
  login: params => axios.post('/usuarios/login', params),
  usuarios: {
    list: page => axios.get('/usuarios', { params: { page } }),
    get: id => axios.get(`/usuarios/${id}`),
    delete: id => axios.delete(`/usuarios/${id}`),
    create: params => axios.post('/usuarios', params),
    update: (id, params) => axios.put(`/usuarios/${id}`, params),
  },
  categorias: {
    list: () => axios.get('/categoria'),
    get: id => axios.get(`/categoria/${id}`)
  },
  subcategorias: {
    list: (page, categoria) => axios.get(`/subcategoria`, { params: { page, categoria } }),
    create: params => axios.post('/subcategoria', params),
    delete: id => axios.delete(`/subcategoria/${id}`),
    get: id => axios.get(`/subcategoria/${id}`),
    update: (id, params) => axios.put(`/subcategoria/${id}`, params),
  },
  etiquetas: {
    list: nombre => axios.get('/etiqueta', { params: { nombre } }),
  },
  objetos: {
    create: params => axios.post('/objetos', params),
    createWithPicture: async params => {
      const createParams = tofd({
        ...params,
        userId: axios.defaults.params.userId
      });

      const headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');

      const conf = {
        method: 'POST',
        headers,
        body: createParams,
      };

      const data = await fetch(`${axios.defaults.baseURL}/objetos`, conf).then(
        async resp => {
          if (!resp.ok) {
            const { error } = JSON.parse(await resp.text());
            const customError = {
              response: {
                status: resp.status,
                data: { error },
              },
            };
            console.log('Custom Error: ', customError);
            throw customError;
          }

          return resp.json();
        })

      return data;
    },
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