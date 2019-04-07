import React, {Component} from 'react';

class FormularioCrearObejto extends Component{
  constructor(args) {
    super(args);
    this.state = {
      usuario: '',
      sub_categoria: '',
      estado:'',
      tags: '',
      add_tag:'',
      lugar_hallasgo:'',
      notas:'',
      option: '',
      display: false,
    };
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
            <select className="form-control" id="opcion" name="usuario" >
              <option value="">Nombre</option>
              <option value="">Raul Andrade</option>
              <option value="">Raul Campos</option>
              <option value="">Daniel Campos</option>
              <option value="">Pablo Melendez</option>
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
            <select className="form-control" id="opcion" name="sub_categoria"  >
              <option value="">Seleccione el tipo de objeto</option>
              <option value="">Telefono</option>
              <option value="">Sueter</option>
              <option value="">Cable</option>
              <option value="">lapiz</option>
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
            <select className="form-control" id="opcion" name="estado" >
              <option value="">Seleccione estado</option>
              <option value="">Bueno</option>
              <option value="">Regular</option>
              <option value="">Malo</option>
            </select>
          </div>
        </div>
        <div class =" row pt-3">
          <div class="col-3">
            <label htmlFor="option">Seleccione las etiquetas que definan al nuvo objeto :</label>
          </div>
          <div className="col-6" >
            <select className="form-control" id="opcion" name="tags" >
              <option value="">Tags</option>
              <option value="">rojo</option>
              <option value="">pantalla</option>
              <option value="">estampado</option>
            </select>
            <label htmlFor="option">Escriba la etiqueta nueva :</label>
            <textarea className="form-control" id="opcion" name="add_tag"  >
            </textarea>
            <button>  <b>Add Etiqueta</b> </button>
          </div>
        </div>
        <div class =" row pt-3">
          <div class="col-3">
            <label htmlFor="option">Lugar de hallazgo:</label>
          </div>
          <div className="col-6" >
            <textarea className="form-control" id="opcion" name="lugar_hallasgo"  >
            </textarea>
          </div>
        </div>
        <div class =" row pt-3">
          <div class="col-3">
            <label htmlFor="option">Notas:</label>
          </div>
          <div className="col-6" >
            <textarea className="form-control" id="opcion" name="notas" >
            </textarea>
          </div>
        </div> 
      </div>
    );
  }
}
export default FormularioCrearObejto;