import React, { Component } from 'react';
import { MainRow, FilterWrapper, TableWrapper } from './styled';

class TablaBusquda extends Component {
  constructor(props) {
    super(props);
    this.state = 'false'
  }

  render() {
    return (
      <div>
        <MainRow className="row">
          <FilterWrapper className="col">
            <div className="row">
              <div className="col">
                <form className="form-inline">
                  <select className="form-control mb-2 mr-sm-2">
                    <option selected>Categorias...</option>
                    <option value="">Electronico</option>
                    <option value="Trabajador">Papeleria</option>
                    <option value="Trabajador">Vestiemnta</option>
                    <option value="Trabajador">Personal</option>
                    <option value="Trabajador">Equipamento</option>
                    <option value="Trabajador">Otro</option>
                  </select>
                  <select className="form-control mb-2 mr-sm-2">
                    <option value="">Tags</option>
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
                  <th scope="col">Ctegoria</th>
                  <th scope="col">Tags</th>
                  <th scope="col">Fehcha encontrado</th>
                  <th scope="col">Lugar encontrado</th>
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

export default TablaBusquda;