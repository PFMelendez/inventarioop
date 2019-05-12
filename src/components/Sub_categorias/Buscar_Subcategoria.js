import React, { Component } from 'react';
import { MainRow, FilterWrapper, TableWrapper } from './styled';

class TablaBusqudaSubcategorias extends Component {
  constructor(props) {
    super(props);
    this.state = {estado: 'false',      
    categorias: []}
  }

  render() {    const {
    categoria,
    categorias,
  } = this.state;
    return (
      <div>
        <MainRow className="row">
          <FilterWrapper className="col">
            <div className="row">
              <div className="col">
                <form className="form-inline">
                  <select className="form-control mb-2 mr-sm-2" id="opcion" name="categoria" onChange={this.handleCategoria} value={categoria} >
                        <option value="">Categoria</option>
                        {categorias.map(item => <option key={`id_sub_categoria-${item.id}`} value={item.id}>{item.descripcion}</option>)}
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
                  <th scope="col">Categoria</th>
                  <th scope="col">Fila</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
            <div>
            <button
                    type="actualizar"
                    className="btn btn-primary mb-2 mr-sm-2"
                  > Guardar
                  </button>
            <button
                type="actualizar"
                className="btn btn-primary mb-2 mr-sm-2"
              > Eliminar
           </button>
            </div>

          </TableWrapper>
        </MainRow>
      </div>
    );
  }
}

export default TablaBusqudaSubcategorias;