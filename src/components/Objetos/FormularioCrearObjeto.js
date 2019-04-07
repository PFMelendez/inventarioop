import React, {Component} from 'react';

class FormularioCrearObejto extends Component{
  constructor(args) {
    super(args);
    this.state = {
      usuario: '',
      sub_categoria: '',
      estado:'',
      tags: [],
      add_tag:[],
      lugar_hallasgo:'',
      notas:'',
      new_tag: ''
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    return (
      <div>
        <div class =" row pt-3">
          <div class="col-3">
            <label htmlFor="option">Llene los campos para agregar un objeto.</label>
          </div>
        </div>
        <div class =" row pt-3">
          <div class="col-3">
            <label htmlFor="option">¿Quien registra la entrada del objeto? :</label>
          </div>
          <div className="col-6" >
            <select onChange={this.handleChange} className="form-control" id="opcion" name="usuario"  >
            {this.props.usuarios.map(item => <option key={`id_usuario-${item.id_usuario}`} value={item.id_usuario}>{item.nombre}</option>)}
            </select>
          </div>
        </div>
        <div class =" row pt-3">
        </div>
        <div class =" row pt-3">
          <div class="col-3">
            <label htmlFor="option">¿Que tipo de objeto fue encontrado? :</label>
          </div>
          <div className="col-6" >
            <select className="form-control" id="opcion" name="sub_categoria" onChange={this.handleChange}  >
            {this.props.usuarios.map(item => <option key={`id_sub_categoria-${item.id_sub_categoria}`} value={item.id_xxxx}>{item.descripcion}</option>)}
            </select>
            <button>  <b>Add Object</b> </button> 
          </div>
        </div>
        <div class =" row pt-3">
        </div>
        <div class =" row pt-3">
          <div class="col-3">
            <label htmlFor="option">Estado del objeto :</label>
          </div>
          <div className="col-6" >
            <select className="form-control" id="opcion" name="estado" onChange={this.handleChange} >
            {this.props.map(item => <option key={`id_estado-${item.id_estado}`} value={item.id_estado}>{item.descripcion}</option>)}
            </select>
          </div>
        </div>
        <div class =" row pt-3">
          <div class="col-3">
            <label htmlFor="option">Seleccione las etiquetas que definan al nuvo objeto :</label>
          </div>
          <div className="col-6" >
            <select className="form-control" id="opcion" name="tags" onChange={this.handleChange} >
            {this.props.usuarios.map(item => <option key={`xxxx-${item.id_tag}`} value={item.id_tag}>{item.nombre}</option>)}
            </select>
            <label htmlFor="option">Escriba la etiqueta nueva :</label>
            <textarea className="form-control" id="opcion" name="add_tag" onChange={this.handleChange} >
            </textarea>
            <button>  <b>Add Etiqueta</b> </button>
          </div>
        </div>
        <div class =" row pt-3">
          <div class="col-3">
            <label htmlFor="option">Lugar de hallazgo:</label>
          </div>
          <div className="col-6" >
            <textarea className="form-control" id="opcion" name="lugar_hallasgo" onChange={this.handleChange} >
            </textarea>
          </div>
        </div>
        <div class =" row pt-3">
          <div class="col-3">
            <label htmlFor="option">Notas:</label>
          </div>
          <div className="col-6" >
            <textarea className="form-control" id="opcion" name="notas" onChange={this.handleChange}>
            </textarea>
          </div>
        </div>
        <div className="col-6" >
            <label htmlFor="option">Si el formulario esta listo clik en:  </label>
            <button>  <b>Enviar Formulario</b> </button>
          </div> 
      </div>
    );
  }
}
export default FormularioCrearObejto;