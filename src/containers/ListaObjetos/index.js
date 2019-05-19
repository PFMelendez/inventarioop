import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
//import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import api from '../../services/api';

//const { SearchBar, ClearSearchButton } = Search;

function imageFormatter(cell, row) {
  return (
    <img src={cell} height={'50'} alt="objeto"></img>
  );
}

function urlFormatter(cell, row) {
  return (
    <a href='detalle/objeto' style={{ color: '#343a3f' }}> {cell} &nbsp; <i className="fas fa-external-link-alt" ></i> </a>
  );
}

class ListaObjetos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      objetos: [],
      page: 0,
    };
    this.loadNext = this.loadNext.bind(this);
    this.loadLast = this.loadLast.bind(this);
  }

  componentDidMount() {
    const that = this;
    api.objetos.listDonate(0)
      .then(response => {
        const { objetos } = response.data;
        that.setState({ objetos });
      })
      .catch(err => {
        console.log(err)
        alert('Error al cargar los objetos.');
      })
  }

  loadNext() {
    const page = this.state.page + 1;
    const that = this;
    api.objetos.listDonate(page)
      .then(response => {
        const { objetos } = response.data;
        that.setState({ objetos, page });
      })
      .catch(err => {
        console.log(err);
        alert('Error al cargar la iguiente pagina');
      })
  }

  loadLast() {
    const page = this.state.page - 1;
    if (page >= 0) {
      const that = this;
      api.objetos.listDonate(page)
        .then(response => {
          const { objetos } = response.data;
          that.setState({ objetos, page });
        })
        .catch(err => {
          console.log(err);
          alert('Error al cargar la iguiente pagina');
        })
    }
  }


  render() {
    const { page, objetos } = this.state;
		const campos = [   
      {
        dataField: 'id',
        text: 'Id',
        sort: true
      },
      {
        dataField: 'name',
        text: 'Nombre',
        style: {
          width: '300px'
        }
      },
      {
        dataField: 'category',
        text: 'Categoría'
      },
      {
        dataField: 'subcategory',
        text: 'Subcategoría'
      },
      {
        dataField: 'image',
        text: 'Imagen',
        align: 'center',
        formatter: imageFormatter, style: {
          width: '150px'
        }
      },
      {
        dataField: 'more',
        text: 'Detalle',
        align: 'center',
        formatter: urlFormatter,
        style: {
          width: '150px'
        }
      }
    ];
    
    return (
      <div className="container-fluid">
				<div className="row mt-3">
					<div className="col-lg-12">
						<div className="card">
							<div className="card-header text-center">
								<h5>
									<button className="btn btn-info mr-5" style={{ float: 'left' }}
										onClick={this.loadLast} disabled={page > 0 ? 'false' : 'true'}>Anterior</button>
									<button className="btn btn-info" style={{ float: 'left' }} onClick={this.loadNext}>Siguiente</button>
									<span>Listado de objetos</span>
								</h5>
							</div>
							<div className="container-fluid" style={{ marginTop: 25 }}>
								<ToolkitProvider
									keyField='id'
									data={objetos}
									columns={campos}
									search
								>
									{
										props => (
											<BootstrapTable
												{...props.baseProps}
												classes="table table-hover text-center"
											/>
										)
									}
								</ToolkitProvider>
							</div>
						</div>
					</div>
				</div>
			</div>
    );
  }
}

export default ListaObjetos;