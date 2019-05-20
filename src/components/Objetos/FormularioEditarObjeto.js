import React, { Component } from 'react';
import api from '../../services/api';
import Combobox from '../Form/Combobox';
import helpers from '../../services/helpers';

class FormularioEditarObejto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
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
      fechaEgreso: null,
      UsuarioSalida: {},
    };
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const that = this;
    api.objetos.get(id)
      .then(response => {
        const {
          Subcategoria: { id: subcategoria },
          nombre,
          Estado: { id: estado },
          lugarHallazgo,
          informacionAdicional: notas,
          Etiquetas: tags,
          Categoria: { id: categoria },
          fechaEgreso,
          UsuarioSalida = {},
        } = response.data.objeto
        api.categorias.get(categoria)
          .then(response => {
            const { categoria: { Subcategorias: subcategorias } } = response.data;
            that.setState({ subcategorias });
          })
          .catch(this.handleApiErrorCategorias);
        that.setState({
          subcategoria,
          nombre,
          estado,
          lugarHallazgo,
          notas,
          tags,
          categoria,
          fechaEgreso,
          UsuarioSalida
        });
      })
      .catch(err => {
        console.log(err);
        alert('Error al cargar el objeto')
      })
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

  liberarObjeto = () => {
    const { id } = this.state;
    const that = this;
    const conf = confirm('Confirme la salida del objeto.');
    if (conf) {
      api.objetos.release({ objetos: [id] })
        .then(response => {
          const {
            Subcategoria: { id: subcategoria },
            nombre,
            Estado: { id: estado },
            lugarHallazgo,
            informacionAdicional: notas,
            Etiquetas: tags,
            Categoria: { id: categoria },
            fechaEgreso,
            UsuarioSalida = {},
          } = response.data.objetos[0];
          alert('El objeto ha salido del inventario');
          api.categorias.get(categoria)
            .then(response => {
              const { categoria: { Subcategorias: subcategorias } } = response.data;
              that.setState({ subcategorias });
            })
            .catch(this.handleApiErrorCategorias);
          that.setState({
            subcategoria,
            nombre,
            estado,
            lugarHallazgo,
            notas,
            tags,
            categoria,
            fechaEgreso,
            UsuarioSalida
          });
        })
        .catch(err => {
          console.log(err);
          alert('Error al liberar los objetos');
        })
    }
  }

  editarObjeto = () => {
    const {
      id,
      subcategoria,
      estado,
      nombre,
      tags: tagObjects,
      newTags: rawNewTags,
      lugarHallazgo,
      notas,
      categoria,
    } = this.state
    const that = this;

    if (!nombre || !estado || !categoria || !subcategoria) {
      alert('Nombre, Estado, Categoria y Subcategoria son campos requeridos, verifique haberlos llenado.');
    } else {
      const rawTags = tagObjects.map(item => item.id);

      // const tags = JSON.stringify(rawTags);
      // const newTags = JSON.stringify(rawNewTags);

      let params = {
        nombre,
        estado,
        lugarHallazgo,
        informacionAdicional: notas,
        subcategoria,
        newTags: rawNewTags,
        tags: rawTags,
      };

      api.objetos.update(id, params)
        .then(response => {
          const {
            Subcategoria: { id: subcategoria },
            nombre,
            Estado: { id: estado },
            lugarHallazgo,
            informacionAdicional: notas,
            Etiquetas: tags,
            Categoria: { id: categoria },
            fechaEgreso,
          } = response.data.objeto
          alert(`Objeto actualizado con exito: ${response.data.objeto.id}`);
          api.categorias.get(categoria)
            .then(response => {
              const { categoria: { Subcategorias: subcategorias } } = response.data;
              that.setState({ subcategorias });
            })
            .catch(this.handleApiErrorCategorias);
          that.setState({
            subcategoria,
            nombre,
            estado,
            lugarHallazgo,
            notas,
            tags,
            categoria,
            fechaEgreso,
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
      fechaEgreso,
    } = this.state;
    console.log(this.state);

    const disabled = fechaEgreso !== null;
    const { antibind } = helpers;
    return (
      <div className='container'>
        <div className=" row pt-3">
          <div className="col-3">
            <label htmlFor="option">Nombre</label>
          </div>
          <div className="col-6" >
            <input type="text" className="form-control" id="nombre" name="nombre" disabled={disabled} onChange={this.handleChange} value={nombre} />
          </div>
        </div>
        <div className=" row pt-3">
          <div className="col-3">
            <label htmlFor="option">Categoria</label>
          </div>
          <div className="col-6" >
            <select className="form-control" id="opcion" name="categoria" disabled onChange={this.handleCategoria} value={categoria} >
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
            <select className="form-control" id="option" name="subcategoria" disabled={disabled} onChange={this.handleChange} value={subcategoria} >
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
            <select className="form-control" id="opcion" name="estado" disabled onChange={this.handleChange} value={estado}>
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
            {tags.map((item, index) => <button type="button" className="btn btn-primary" disabled={disabled} onClick={antibind(this.deleteTag, index)}>{item.nombreEtiqueta}</button>)}
            {newTags.map((item, index) => <button type="button" className="btn btn-primary" disabled={disabled} onClick={antibind(this.deleteNewTag, index)}>{item}</button>)}
          </div>
        </div>
        <div className=" row pt-3">
          <div className="col-3">
            <label htmlFor="option">Lugar de hallazgo</label>
          </div>
          <div className="col-6" >
            <input type="text" className="form-control" id="opcion" name="lugarHallazgo" disabled onChange={this.handleChange} value={lugarHallazgo} />
          </div>
        </div>
        <div className=" row pt-3">
          <div className="col-3">
            <label htmlFor="option">Notas:</label>
          </div>
          <div className="col-6" >
            <textarea type="text" className="form-control" id="opcion" name="notas" disabled={disabled} onChange={this.handleChange} value={notas}></textarea>
          </div>
        </div>
        {disabled && (
          <div className=" row pt-3">
            <div className="col-3">
              <label htmlFor="option">Usuario que registro salida:</label>
            </div>
            <div className="col-6" >
              <p></p>
            </div>
          </div>
        )}
        <br />
        <div className="row">
          <div className="col-6" >
            <button type="button" disabled={disabled} onClick={this.editarObjeto} className="btn btn-primary mr-5">Guardar Objeto</button>
            <button type="button" disabled={disabled} className="btn btn-success mr-5" onClick={this.liberarObjeto}>Liberar Objeto</button>
          </div>
        </div>
        <br />
      </div>
    );
  }
}
export default FormularioEditarObejto;