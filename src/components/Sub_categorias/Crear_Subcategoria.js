import React, { Component } from 'react';
import api from '../../services/api';
//import helpers from '../../services/helpers';
//import { MainRow, FilterWrapper, TableWrapper } from './styled';
class FormularioCrearObejto extends Component {

  constructor(args) {
    super(args);
    this.state = {
      usuario: '',
      subCategoria: '',
      nombre: '',
      estado: '',
      tags: [],
      newTags: [],
      lugarHallazgo: '',
      notas: '',
      nombreNuevaEtiqueta: '',
      categorias: [],
      subCategorias: [],
      etiquetas: [],
      estados: [],
      categoria: 0
    };
  }

  componentDidMount() {
    const that = this;
    api.categorias.list()
      .then(response => {
        const { categorias } = response.data;
        that.setState({ categorias });
      });
    api.estados.list()
      .then(response => {
        const { estados } = response.data;
        that.setState({ estados });
      });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCategoria = e => {
    const { value: categoria } = e.target;
    this.setState({ categoria: e.target.value });
    const that = this;
    api.subcategorias.list(categoria)
      .then(response => {
        const { subCategorias } = response.data;
        that.setState({ subCategorias });
      })
  }

  handleSubCategoria = e => {
    const { value } = e.target;
    this.setState({ subCategoria: value });
  }

  handleNombreEtiqueta = e => {
    const { value } = e.target;
    this.setState({ nombreNuevaEtiqueta: value });
    const that = this;
    api.etiquetas.list(value)
      .then(response => {
        const { etiquetas } = response.data;
        that.setState({ etiquetas });
      })
  }

  handleEtiquetas = (e, ind) => {
    if (ind !== -1) {
      const { etiquetas, tags } = this.state;

      const etiqueta = { ...etiquetas[ind] };
      const updatedTags = [...tags, etiqueta];
      this.setState({ tags: [...updatedTags], nombreNuevaEtiqueta: '' });
    } else {
      const { newTags, nombreNuevaEtiqueta } = this.state;
      newTags.push(nombreNuevaEtiqueta);
      this.setState({ newTags: [...newTags], nombreNuevaEtiqueta: '' });
    }
  }

  deleteTag = (e, ind) => {
    const { tags } = this.state;

    const rawTags = [...tags];
    rawTags.splice(ind, 1);
    this.setState({ tags: [...rawTags] });
  }

  deleteNewTag = (e, ind) => {
    const { newTags } = this.state;

    const rawTags = [...newTags];
    rawTags.splice(ind, 1);
    this.setState({ newTags: [...rawTags] });
  }

  registrarObjeto = () => {
    const {
      subCategoria,
      estado,
      nombre,
      tags: tagObjects,
      newTags: rawNewTags,
      lugarHallazgo,
      notas,
    } = this.state

    const rawTags = tagObjects.map(item => item.id_etiqueta);

    const tags = JSON.stringify(rawTags);
    const newTags = JSON.stringify(rawNewTags);

    const params = {
      nombre,
      estado,
      lugar_hallazgo: lugarHallazgo,
      informacion_adicional: notas,
      subCategoria,
      newTags,
      tags
    };
    const that = this;

    api.objetos.create(params)
      .then(response => {
        alert(`Objeto Creado con exito: ${response.data.objeto.id_objetos}`);
        that.setState({
          usuario: '',
          subCategoria: '',
          nombre: '',
          estado: '',
          tags: [],
          newTags: [],
          lugarHallazgo: '',
          notas: '',
          nombreNuevaEtiqueta: '',
          subCategorias: [],
          etiquetas: [],
          categoria: 0
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    const {
      categoria,
      categorias,
      subCategorias,
      nombre,
      subCategoria
    } = this.state;

    //const { antibind } = helpers;
    return (
      <div className='container'>
        <div className=" row pt-3">
            <th scope="col">Llene los campos para agregar un a nueva Subcategoria.</th>
        </div>
        <div className=" row pt-3">
        </div>
        <div className=" row pt-3">
          <ul class="list-group list-group-horizontal justified">
          <th scope="col">Escriba el nombre de la Subcategoria.</th>
            <div className="col-3">  </div>
            <div className="col-6" >
              <input type="text" className="form-control" id="nombre" name="nombre" onChange={this.handleChange} value={nombre} />
            </div>
          </ul>
        </div>
        <div className=" row pt-3">
          <ul class="list-group list-group-horizontal justified">
            <th scope="col">Seleccione la categoria a la que pertenece pertenece.</th>
            <div className="col-3">  </div>
            <select className="form-control" id="opcion" name="categoria" onChange={this.handleCategoria} value={categoria} >
              <option value="">Seleccione...</option>
              {categorias.map(item => <option key={`id_sub_categoria-${item.id}`} value={item.id}>{item.descripcion}</option>)}
            </select>
          </ul>
        </div>
        <div className=" row pt-3">
          <ul class="list-group list-group-horizontal">
            <th scope="col">Seleccione la fila de donde estara ubicada la subtegoria.  </th>
            <div className="col-3">  </div>
            <select className="form-control" id="option" name="subCategoria" onChange={this.handleChange} value={subCategoria} >
              <option value="">Seleccione...</option>
              {subCategorias.map(item => <option key={`id_sub_categoria-${item.id}`} value={item.id}>{item.descripcion}</option>)}
            </select>
          </ul>
        </div>
        <div className="col-6" >

        </div>
        <div className="row pt-3" >
        <button type="submit"
                    className="btn btn-primary mb-2 mr-sm-2"
                  >
                    Guardar subCategoria
                  </button>
        </div>
        <br />
      </div>
    );
  }
}
export default FormularioCrearObejto;