import React, { Component } from 'react';
//import { Button, Form } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import moment from 'moment';
import api from '../../services/api';
import helpers from '../../services/helpers';

const { antibind } = helpers;

// const { SearchBar, ClearSearchButton } = Search;


class ListaDonarObjetos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			objetos: [],
			page: 0,
			lastPage: false
		};
		this.loadObjects = this.loadObjects.bind(this);
		this.handleApiErrors = this.handleApiErrors.bind(this);
		this.loadNext = this.loadNext.bind(this);
		this.loadLast = this.loadLast.bind(this);
		this.liberarObjetos = this.liberarObjetos.bind(this);
		this.liberarObjeto = this.liberarObjeto.bind(this);
		this.buttonFormatter = this.buttonFormatter.bind(this);
	}

	componentDidMount() {
		const { page } = this.state;
		api.objetos.listDonate(page)
			.then(antibind(this.loadObjects, page))
			.catch(this.handleApiErrors)
	}

	loadObjects(response, page) {
		const { objetos } = response.data;

		if (objetos.length === 0) {
			const { objetos: oldObjects } = this.state;

			this.setState({ lastPage: true });

			if (page === 0) {
				this.setState({ objetos: [] });
			}

			if (oldObjects.length > 0) {
				alert('No hay mas objetos que cargar');
			}
		} else if (objetos.length < 10) {
			this.setState({ objetos, lastPage: true, page });
		} else {
			this.setState({ objetos, page });
		}
	}

	handleApiErrors(err) {
		console.log(err);
		alert('Hubo un error al cargar los objetos.');
	}

	loadNext() {
		const page = this.state.page + 1;
		api.objetos.listDonate(page)
			.then(antibind(this.loadObjects, page))
			.catch(this.handleApiErrors)
	}

	loadLast() {
		const page = this.state.page - 1;
		if (page >= 0) {
			api.objetos.listDonate(page)
				.then(antibind(this.loadObjects, page))
				.catch(this.handleApiErrors)
		}
	}

	liberarObjetos() {
		const { objetos } = this.state;
		const conf = confirm('Confirme la salida de los objetos.');
		if (conf) {
			const objetosIds = objetos.map(item => item.id);
			api.objetos.release({ objetos: objetosIds })
				.then(() => {
					alert('Todos los objetos de esta pagina han salido del inventario');
					api.objetos.listDonate(0)
						.then(antibind(this.loadObjects, 0))
						.catch(this.handleApiErrors)
				})
				.catch(err => {
					console.log(err);
					alert('Error al liberar los objetos');
				})
		}
	}

	liberarObjeto(id) {
		const { page } = this.state;
		const conf = confirm('Confirme la salida del objeto.');
		if (conf) {
			api.objetos.release({ objetos: [id] })
				.then(() => {
					alert('El objeto ha salido del inventario');
					api.objetos.listDonate(page)
						.then(antibind(this.loadObjects, page))
						.catch(this.handleApiErrors)
				})
				.catch(err => {
					console.log(err);
					alert('Error al liberar los objetos');
				})
		}
	}

	imageFormatter(cell) {
		return (
			<img src={cell} height={'50'} alt='objeto' />
		);
	}

	buttonFormatter(cell, row) {
		const cb = () => this.liberarObjeto(cell, row);
		return (
			<button type="button" className="btn btn-primary" onClick={cb}>liberar</button>
		);
	}

	dateFormatter(cell) {
		return moment(cell).format('DD/MM/YYYY');
	}


	render() {
		const { page, objetos } = this.state;
		const campos = [
			{
				dataField: 'nombre',
				text: 'Nombre',
				style: {
					width: '150px'
				}
			},
			{
				dataField: 'fechaIngreso',
				text: 'Fecha Ingreso',
				formatter: this.dateFormatter,
				style: {
					width: '150px',
				}
			},
			{
				dataField: 'url',
				text: 'Imagen',
				align: 'center',
				formatter: this.imageFormatter,
				style: {
					width: '150px'
				}
			},
			{
				dataField: 'id',
				text: 'Acciones',
				align: 'center',
				formatter: this.buttonFormatter,
				style: {
					width: '150px',
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
									<span>Listado de objetos disponibles para liberar</span>
									<button type="button" className="btn btn-primary" onClick={this.liberarObjetos} style={{ float: 'right' }}>Liberar Todos</button>
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

export default ListaDonarObjetos;