import React, { Component } from 'react';
import { push } from 'connected-react-router'
import { connect } from 'react-redux';
import { MainRow, FilterWrapper, TableWrapper } from './styled';
import api from '../../services/api';
import helpers from '../../services/helpers';

const { antibind } = helpers;

class TablaBusqudaSubcategorias extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoria: 0,
      categorias: [],
      subcategorias: [],
      page: 0,
      lastPage: false
    };
    this.loadSubcategories = this.loadSubcategories.bind(this);
    this.handleApiErrors = this.handleApiErrors.bind(this);
    this.loadNext = this.loadNext.bind(this);
    this.loadLast = this.loadLast.bind(this);
    this.handleCategoria = this.handleCategoria.bind(this);
  }

  componentDidMount() {
    const { page, categoria } = this.state;
    const that = this;
    api.categorias.list()
      .then(response => {
        const { categorias } = response.data;
        that.setState({ categorias });
        api.subcategorias.list(page, categoria)
          .then(antibind(that.loadSubcategories, page))
          .catch(that.handleApiErrors)
      })
      .catch(this.handleApiErrors)
  }

  loadSubcategories(response, page) {
    const { subCategorias: subcategorias } = response.data;

    if (subcategorias.length === 0) {
      const { subcategorias: oldSubcategorias } = this.state;

      this.setState({ lastPage: true });

      if (page === 0) {
        this.setState({ subcategorias: [] });
      }

      if (oldSubcategorias.length > 0) {
        alert('No hay mas subcategorias que cargar');
      }
    } else if (subcategorias.length < 10) {
      this.setState({ subcategorias, lastPage: true, page });
    } else {
      this.setState({ subcategorias, page });
    }
  }

  handleApiErrors(err) {
    console.log(err);
    alert('Hubo un error al cargar las subcategorias');
  }

  loadNext() {
    const { categoria } = this.state;
    const page = this.state.page + 1;
    api.subcategorias.list(page, categoria)
      .then(antibind(this.loadSubcategories, page))
      .catch(this.handleApiErrors)
  }

  loadLast() {
    const { categoria } = this.state;
    const page = this.state.page - 1;
    if (page >= 0) {
      api.subcategorias.list(page, categoria)
        .then(antibind(this.loadSubcategories, page))
        .catch(this.handleApiErrors)
    }
  }

  editSubcategory = (e, id) => {
    const { navigate } = this.props;
    navigate(`/admin/subcategorias/${id}`);
  }

  deleteSubcategory = (e, id) => {
    const conf = confirm('Confirme el eliminar la subcategoria del sistema.');
    if (conf) {
      const that = this;
      api.subcategorias.delete(id)
        .then(() => {
          const { page, categoria } = that.state;
          api.subcategorias.list(page, categoria)
            .then(antibind(that.loadSubcategories, page))
            .catch(that.handleApiErrors);
        })
        .catch(that.handleApiErrors);
    }
  }

  handleCategoria(e) {
    const { value } = e.target;
    const categoria = parseInt(value);
    this.setState({ categoria });
    api.subcategorias.list(0, categoria)
      .then(antibind(this.loadSubcategories, 0))
      .catch(this.handleApiErrors)
  }

  render() {
    const {
      categoria,
      categorias,
      subcategorias,
      page,
      lastPage
    } = this.state;
    console.log(lastPage);
    return (
      <div>
        <MainRow className="row">
          <FilterWrapper className="col">
            <div className="row">
              <div className="col-2">
                {/* <form className="form-inline"> */}
                <select className="form-control mb-2 mr-sm-2" id="opcion" name="categoria" onChange={this.handleCategoria} value={categoria} >
                  <option value="0">Categoria</option>
                  {categorias.map(item => <option key={`id_sub_categoria-${item.id}`} value={item.id}>{item.descripcion}</option>)}
                </select>
                {/* </form> */}
              </div>
              <div className='col-3'>
                <button className="btn btn-info mr-5" style={{ float: 'left' }} onClick={this.loadLast} disabled={!page}>
                  Anterior
                </button>
                <button className="btn btn-info" style={{ float: 'left' }} onClick={this.loadNext} disabled={lastPage}>
                  Siguiente
                </button>
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
                  <th scope="col">Seccion</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {subcategorias.map(item => (
                  <tr key={item.id}>
                    <td>{item.descripcion}</td>
                    <td>{item.Categoria.descripcion}</td>
                    <td>{`${item.Categoria.estante}-${item.seccion}`}</td>
                    <td>
                      <button type="button" className="btn btn-primary mb-2 mr-sm-2" onClick={antibind(this.editSubcategory, item.id)}>Editar</button>
                      <button type="actualizar" className="btn btn-danger mb-2 mr-sm-2" onClick={antibind(this.deleteSubcategory, item.id)}>Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        </MainRow>
      </div>
    );
  }
}

const dispatcher = dispatch => ({ navigate: url => dispatch(push(url)) })

export default connect(null, dispatcher)(TablaBusqudaSubcategorias);
