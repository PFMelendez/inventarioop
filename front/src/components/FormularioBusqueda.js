import React, {Component} from 'react';


const Name = props => (
  <div class="row">
    <div class="col-3" style={ { display: props.style } }>
      <label htmlFor="Tag">Tag</label>
    </div>
    <div class="col-6"  style={ { display: props.style } }>
      <input
        className ="form-control"
        value={props.tag}
        onChange={props.change}
        name="tag" id="Tag" type="text"/>
    </div>
  </div>
);

const Send = props => (
   <button style={ { display: props.style } } className="btn btn-info" onClick={ props.onClick }>Buscar</button>
);

class FormularioBusqueda extends Component{
  constructor(args) {
    super(args);
    this.state = {
      tag: '',
      option: '',
      display: false,
    };
  }

  Toogle() {
    this.setState({
      display: true,
    });
  }

  onChange(e) {
    this.setState({
      [e.target.tag]: e.target.value,
    });
  }

  send(e) {
    this.setState({
      message: 'Enviado',
    });
  }

  render() {
    return (
      <div>
        <div class =" row pt-3">
          <div class="col-3">
            <label htmlFor="option">Tipo objeto</label>
          </div>
          <div className="col-6" >
            <select className="form-control" id="opcion" name="option" onChange={ this.Toogle.bind(this) } >
              <option value="Elige">Elige</option>
              <option value="">Electronico</option>
              <option value="Trabajador">Papeleria</option>
              <option value="Trabajador">Vestiemnta</option>
              <option value="Trabajador">Personal</option>
              <option value="Trabajador">Equipamento</option>
              <option value="Trabajador">Otro</option>
            </select>
          </div>
        </div>
        <div className= "row pt-2">
          {this.state.display ? (
            <div className="col-12">
              <Name style="inline-block" name={this.state.tag} change={this.onChange.bind(this)} />
            </div>
            ) : (
              <Name style="none" name={this.state.tag} change={this.onChange.bind(this)}/>
            )}
        </div>
        <div class="pt-2">
          {this.state.display ? (
              <Send style="inline-block" />
            ) : (
                <Send style="none" />
            )}
        </div>
      </div>
    );
  }
}
export default FormularioBusqueda;
