import React, {Component} from 'react';



class FormularioBuscarObjetos extends Component{

    render() {
      return (
        <div>
                  <div class =" row pt-3">
          <div class ="col-3">
            <label htmlFor="option">Seleccione tags para la busqueda :</label>
          </div>
          <div className="col-6" >
            <select className="form-control" id="opcion" name="option" >
            <option value="">Tags</option>
              <option value="">rojo</option>
              <option value="">pantalla</option>
              <option value="">estampado</option>
            </select>
            <button>  <b>Add Etiqueta</b> </button>
          </div>
        </div>
        <div class =" row pt-3">
          <div className="col-3">
            <label htmlFor="option">Tags seleccionadas :</label>
          </div>
          <div className="col-6" >
          <select className="form-control" id="opcion" name="option" >
            <option value=""></option>
              <option value="">rojo</option>
            </select>
            <button>  <b>Eliminar Etiqueta</b> </button>
            <button>  <b>Buscar</b> </button>
          </div>
        </div>
        <div class =" row pt-3">
          <div className="col-3">
            <label htmlFor="option">Objetos encontrados :</label>
          </div>
          <div className="col-6" >
          <select className="form-control" id="opcion" name="option" >
            <option value=""></option>
              <option value=""></option>
            </select>
          </div>
        </div>
        <div class =" row pt-3">
          <div className="col-3">
            <label htmlFor="option">      </label>
          </div>
          <div className="nav-item">
              <a className="nav-link" href="../../components/Objetos/FormularioBuscarObjetos">Agregar Nuevo objeto perdido</a>
          </div>
        </div>
        </div>
      );
    }
  }
  export default FormularioBuscarObjetos;