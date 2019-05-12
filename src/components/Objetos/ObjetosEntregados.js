import React, { Component } from 'react';
import { MainRow, FilterWrapper, TableWrapper } from './styled';

class ObjetosEntregados extends Component {
  constructor(props) {
    super(props);
    this.state = {estado: 'false',      
    Objetos: []}
  }

  render() {    const {
    dia,
    mes,
    año,
    Objetos,
  } = this.state;
    return (
      <div>
        <MainRow className="row">
          <FilterWrapper className="col">
            <div className="row">
              <div className="col">
                <form className="form-inline">
                  <select className="form-control mb-2 mr-sm-2" id="opcion" name="dia" onChange={this.handleCategoria} value={dia} >
                        <option value="">Dia</option>
                        {Objetos.map(item => <option key={`id_sub_categoria-${item.id}`} value={item.id}>{item.descripcion}</option>)}
                    </select>
                    <select className="form-control mb-2 mr-sm-2" id="opcion" name="mes" onChange={this.handleCategoria} value={mes} >
                        <option value="">Mes</option>
                        {Objetos.map(item => <option key={`id_sub_categoria-${item.id}`} value={item.id}>{item.descripcion}</option>)}
                    </select>
                    <select className="form-control mb-2 mr-sm-2" id="opcion" name="año" onChange={this.handleCategoria} value={año} >
                        <option value="">Año</option>
                        {Objetos.map(item => <option key={`id_sub_categoria-${item.id}`} value={item.id}>{item.descripcion}</option>)}
                    </select>
                  <button
                    type="submit"
                    className="btn btn-primary mb-2 mr-sm-2"
                  >
                    Buscar
                  </button>
                </form>
              </div>
            </div>
          </FilterWrapper>
        </MainRow>
        <MainRow className="row">
          <TableWrapper className="col">
            <table className="table table-hover text-center">
              <thead>
                <tr>
                  <th scope="col">Nombre</th>
                  <th scope="col">Tipo de objeto</th>
                  <th scope="col">Subcategoria</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Etiquetas</th>
                  <th scope="col">Lugar de hallazgo</th>
                  <th scope="col">Notas</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </TableWrapper>
        </MainRow>
      </div>
    );
  }
}

export default ObjetosEntregados;