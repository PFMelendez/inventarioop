import React, { Component } from 'react';
import api from '../../services/api';
import Combobox from '../Form/Combobox';
import helpers from '../../services/helpers';

class FormularioCrearObejto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usuario: '',
      subcategoria: 0,
      nombre: '',
      estado: '',
      tags: [],
      newTags: [],
      lugarHallazgo: '',
      notas: '',
      nombreNuevaEtiqueta: '',
      categorias: [],
      subcategorias: [],
      etiquetas: [],
      estados: [],
      categoria: 0,
      foto: [],
    };
    this.foto = React.createRef();
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
    const that = this;
    this.setState({ categoria });
    if (parseInt(categoria) > 0) {
      api.categorias.get(categoria)
        .then(response => {
          const { categoria: { Subcategorias: subcategorias } } = response.data;
          that.setState({ subcategorias });
        })
        .catch(this.handleApiErrorCategorias);
    } else {
      this.setState({ subcategorias: [] });
    }
  }

  handleApiErrorCategorias(err) {
    console.log(err);
    alert('Hubo un error al cargar categoria.');
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

  handleFile = e => {
    this.setState({ foto: e.target.files });
  }

  registrarObjeto = e => {
    e.preventDefault();
    const {
      subcategoria,
      estado,
      nombre,
      tags: tagObjects,
      newTags: rawNewTags,
      lugarHallazgo,
      notas,
      categoria,
      // foto
    } = this.state
    const that = this;

    if (!nombre || !estado || !categoria || !subcategoria) {
      alert('Nombre, Estado, Categoria y Subcategoria son campos requeridos, verifique haberlos llenado.');
    } else {
      const rawTags = tagObjects.map(item => item.id);

      const tags = JSON.stringify(rawTags);
      const newTags = JSON.stringify(rawNewTags);

      let params = {
        nombre,
        estado,
        lugarHallazgo,
        informacionAdicional: notas,
        subcategoria,
        categoria,
        newTags,
        tags,
      };

      api.objetos.create(params)
        .then(response => {
          alert(`Objeto Creado con exito: ${response.data.objeto.id}`);
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
  }

  render() {
    const {
      categoria,
      estado,
      lugarHallazgo,
      notas,
      categorias,
      subcategorias,
      estados,
      etiquetas,
      nombre,
      nombreNuevaEtiqueta,
      tags,
      newTags,
      subcategoria,
    } = this.state;
    console.log(this.state);

    const { antibind } = helpers;
    return (
      <div className='container'>
        <form onSubmit={this.registrarObjeto}>
          <div className=" row pt-3">
            <div className="col-3">
              <label htmlFor="option">Nombre</label>
            </div>
            <div className="col-6" >
              <input type="text" className="form-control" id="nombre" name="nombre" onChange={this.handleChange} value={nombre} />
            </div>
          </div>
          <div className=" row pt-3">
            <div className="col-3">
              <label htmlFor="option">Categoria</label>
            </div>
            <div className="col-6" >
              <select className="form-control" id="opcion" name="categoria" onChange={this.handleCategoria} value={categoria} >
                <option value="">Seleccione...</option>
                {categorias.map(item => <option key={`id-${item.id}`} value={item.id}>{item.descripcion}</option>)}
              </select>
            </div>
          </div>
          <div className=" row pt-3">
          </div>
          <div className=" row pt-3">
            <div className="col-3">
              <label htmlFor="option">Subcategoria</label>
            </div>
            <div className="col-6" >
              <select className="form-control" id="option" name="subcategoria" onChange={this.handleChange} value={subcategoria} >
                <option value="">Seleccione...</option>
                {subcategorias.map(item => <option key={`idSubcategoria-${item.id}`} value={item.id}>{item.descripcion}</option>)}
              </select>
            </div>
          </div>
          <div className=" row pt-3">
          </div>
          <div className=" row pt-3">
            <div className="col-3">
              <label htmlFor="option">Estado</label>
            </div>
            <div className="col-6" >
              <select className="form-control" id="opcion" name="estado" onChange={this.handleChange} value={estado}>
                <option value="">Seleccione...</option>
                {estados.map(item => <option key={`idEstado-${item.id}`} value={item.id}>{item.descripcion}</option>)}
              </select>
            </div>
          </div>
          <div className=" row pt-3">
            <div className="col-3">
              <label>Etiquetas</label>
            </div>
            <div className="col-6" >
              <Combobox showMenu={(nombreNuevaEtiqueta.length > 3)} inputCb={this.handleNombreEtiqueta} selectCb={this.handleEtiquetas} options={etiquetas} val={nombreNuevaEtiqueta} placeholder='Etiquetas' />
            </div>
          </div>
          <div className=" row pt-3">
          </div>
          <div className=" row pt-3">
            <div className="col-9">
              {tags.map((item, index) => <button type="button" className="btn btn-primary" onClick={antibind(this.deleteTag, index)}>{item.nombreEtiqueta}</button>)}
              {newTags.map((item, index) => <button type="button" className="btn btn-primary" onClick={antibind(this.deleteNewTag, index)}>{item}</button>)}
            </div>
          </div>
          <div className=" row pt-3">
            <div className="col-3">
              <label htmlFor="option">Lugar de hallazgo</label>
            </div>
            <div className="col-6" >
              <input type="text" className="form-control" id="opcion" name="lugarHallazgo" onChange={this.handleChange} value={lugarHallazgo} />
            </div>
          </div>
          <div className=" row pt-3">
            <div className="col-3">
              <label htmlFor="option">Notas:</label>
            </div>
            <div className="col-6" >
              <textarea type="text" className="form-control" id="opcion" name="notas" onChange={this.handleChange} value={notas}></textarea>
            </div>
          </div>
          {/* <div className=" row pt-3">
            <div className="col-3">
              <label htmlFor="imagen">Foto</label>
            </div>
            <div className="col-6" >
              <div className="input-group">
                <div className="custom-file">
                  <input type="file" className="custom-file-input" name='fotoObjeto' onChange={this.handleFile} multiple={false} />
                  <label className="custom-file-label">{`${photo.name || ''}`}</label>
                </div>
              </div>
            </div>
          </div> */}
          <br />
          <div className="row">
            <div className="col-6" >
              <button type="submit" className="btn btn-primary">Registrar Objeto</button>
            </div>
          </div>
        </form>
        <br />
      </div>
    );
  }
}
export default FormularioCrearObejto;