import React, { Component } from 'react';
import api from '../../services/api';

class FormularioCrearSubcategoria extends Component {

  constructor(args) {
    super(args);
    this.state = {
      descripcion: '',
      categorias: [],
      seccion: '',
      categoria: 0
    };
    this.createSubcategory = this.createSubcategory.bind(this);
  }

  componentDidMount() {
    const that = this;
    api.categorias.list()
      .then(response => {
        const { categorias } = response.data;
        that.setState({ categorias });
      })
      .catch(err => {
        console.log(err);
        alert('Hubo un error al cargar las categorias');
      });
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  createSubcategory() {
    const { descripcion, categoria: rawRategoria, seccion } = this.state;
    if (!descripcion || !rawRategoria || !seccion) {
      alert('Debe llenar todos los campos');
    } else {
      const categoria = parseInt(rawRategoria, 10);
      const that = this;
      api.subcategorias.create({ descripcion, categoria, seccion })
        .then(response => {
          alert(`Subcategoria creada correctamente ID: ${response.data.subCategoria.id}`);
          that.setState({
            descripcion: '',
            categoria: '',
            seccion: ''
          })
        })
    }
  }

  render() {
    const {
      categoria,
      categorias,
      descripcion,
      seccion,
    } = this.state;

    //const { antibind } = helpers;
    return (
      <div className="container">
        <div className="row pt-3">
          <div className="col-3">
            <div className="row">
              <div className="col">
                <p>Nombre</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" id="descripcion" name="descripcion" onChange={this.handleChange} value={descripcion} />
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-3">
            <div className="row">
              <div className="col">
                <p>Categoria</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col">
                <select className="form-control" id="categoria" name="categoria" onChange={this.handleChange} value={categoria}>
                  <option value="0">Seleccione...</option>
                  {categorias.map(item => <option key={`id_sub_categoria-${item.id}`} value={item.id}>{item.descripcion}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col-3">
            <div className="row">
              <div className="col">
                <p>Seccion</p>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="row">
              <div className="col">
                <input type="number" className="form-control" id="seccion" name="seccion" onChange={this.handleChange} value={seccion} />
              </div>
            </div>
          </div>
        </div>
        <div className="row pt-3" >
          <button type="submit" className="btn btn-primary mb-2 mr-sm-2" onClick={this.createSubcategory}>Crear Subcategoria</button>
        </div>
      </div>
    );
  }
}
export default FormularioCrearSubcategoria;