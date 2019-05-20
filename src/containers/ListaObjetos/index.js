import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import moment from 'moment';
import api from '../../services/api';
import helpers from '../../services/helpers';

const { antibind } = helpers;

class ListaObjetos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			objetos: [],
			page: 0,
			lastPage: false,
			categorias: [],
			subcategorias: [],
			categoria: 0,
			subcategoria: 0,
			nombre: ''
		};
		this.loadObjects = this.loadObjects.bind(this);
		this.handleApiErrors = this.handleApiErrors.bind(this);
		this.loadNext = this.loadNext.bind(this);
		this.loadLast = this.loadLast.bind(this);
		this.liberarObjeto = this.liberarObjeto.bind(this);
		this.buttonFormatter = this.buttonFormatter.bind(this);
	}

	componentDidMount() {
		const { page } = this.state;
		const that = this;
		api.categorias.list()
			.then(response => {
				const { categorias } = response.data;
				that.setState({ categorias });
			})
			.catch(this.handleApiErrors)
			.catch
		api.objetos.find(page)
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

	handleApiErrorCategorias(err) {
		console.log(err);
		alert('Hubo un error al cargar categoria.');
	}

	loadNext() {
		const { subcategoria, nombre } = this.state;
		const params = { subcategoria, nombre };
		if (!subcategoria)
			delete params.subcategoria;
		if (!nombre)
			delete params.nombre;
		const page = this.state.page + 1;
		api.objetos.find(page, params)
			.then(antibind(this.loadObjects, page))
			.catch(this.handleApiErrors)
	}

	loadLast() {
		const { subcategoria, nombre } = this.state;
		const params = { subcategoria, nombre };
		if (!subcategoria)
			delete params.subcategoria;
		if (!nombre)
			delete params.nombre;
		const page = this.state.page - 1;
		if (page >= 0) {
			api.objetos.find(page, params)
				.then(antibind(this.loadObjects, page))
				.catch(this.handleApiErrors)
		}
	}

	liberarObjeto(id) {
		const { page, subcategoria, categoria, nombre } = this.state;
		const params = { subcategoria, nombre, categoria };
		if (!subcategoria)
			delete params.subcategoria;
		if (!categoria)
			delete params.categoria;
		if (!nombre)
			delete params.nombre;
		const conf = confirm('Confirme la salida del objeto.');
		if (conf) {
			api.objetos.release({ objetos: [id] })
				.then(() => {
					alert('El objeto ha salido del inventario');
					api.objetos.find(page, params)
						.then(antibind(this.loadObjects, page))
						.catch(this.handleApiErrors)
				})
				.catch(err => {
					console.log(err);
					alert('Error al donar los objetos');
				})
		}
	}

	imageFormatter(cell, row) {
		return (
			<img src={cell} height={'50'} alt="objeto"></img>
		);
	}

	urlFormatter(cell, row) {
		return (
			<a href='detalle/objeto' style={{ color: '#343a3f' }}> {cell} &nbsp; <i className="fas fa-external-link-alt" ></i> </a>
		);
	}

	buttonFormatter = (cell, row) => {
		const cb = () => this.liberarObjeto(cell, row);
		return (
			<button type="button" className="btn btn-primary" onClick={cb}>Liberar</button>
		);
	}

	handleFilters = e => {
		const { name, value } = e.target;
		const { categoria, subcategoria, nombre } = this.state;
		let params = { subcategoria, nombre, categoria };
		if (!subcategoria)
			delete params.subcategoria;
		if (!categoria)
			delete params.categoria;
		if (!nombre)
			delete params.nombre;

		params[name] = value;
		if (parseInt(value) > 0 || value === '')
			delete params[name];


		this.setState({ [name]: value });
		if (name === 'subcategoria') {
			api.objetos.find(0, params)
				.then(antibind(this.loadObjects, 0))
				.catch(this.handleApiErrors);
		} else if (name === 'nombre') {
			api.objetos.find(0, params)
				.then(antibind(this.loadObjects, 0))
				.catch(this.handleApiErrors);
		}
	}

	handleCategoria = e => {
		const { value } = e.target;
		const that = this;
		const { nombre } = this.state;
		let params = { nombre };
		if (!nombre)
			delete params.nombre;
		this.setState({ categoria: value, subcategoria: 0, page: 0 });
		if (parseInt(value) !== 0) {
			params.categoria = value
			api.categorias.get(value)
				.then(response => {
					const { categoria: { Subcategorias: subcategorias } } = response.data;
					that.setState({ subcategorias });
				})
				.catch(this.handleApiErrorCategorias);
			api.objetos.find(0, params)
				.then(antibind(this.loadObjects, 0))
				.catch(this.handleApiErrors);
		} else {
			this.setState({ subcategorias: [] });
			api.objetos.find(0, params)
				.then(antibind(this.loadObjects, 0))
				.catch(this.handleApiErrors);
		}
	}

	dateFormatter(cell) {
		return moment(cell).format('DD/MM/YYYY');
	}


	render() {
		const campos = [
			{
				dataField: 'nombre',
				text: 'Nombre',
				style: {
					width: '300px'
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
				dataField: 'image',
				text: 'Imagen',
				align: 'center',
				formatter: this.imageFormatter, style: {
					width: '150px'
				}
			},
			{
				dataField: 'id',
				text: 'acciones',
				align: 'center',
				formatter: this.buttonFormatter,
				style: {
					width: '150px'
				}
			}
		];

		const {
			objetos,
			page,
			lastPage,
			categorias,
			subcategorias,
			categoria,
			subcategoria,
			nombre,
		} = this.state;

		return (
			<div className="container-fluid">
				<div className="row mt-3">
					<div className="col-lg-12">
						<div className="card">
							<div className="card-header text-center">
								<div className="row">
									<div className='col-3'>
										<button className="btn btn-info mr-5" style={{ float: 'left' }} onClick={this.loadLast} disabled={!page}>
											Anterior
                    </button>
										<button className="btn btn-info" style={{ float: 'left' }} onClick={this.loadNext} disabled={lastPage}>
											Siguiente
                    </button>
									</div>
									<div className="col-2">
										<select className="form-control mb-2 mr-sm-2" id="opcion" name="categoria" onChange={this.handleCategoria} value={categoria} >
											<option value="0">Categoria</option>
											{categorias.map(item => <option key={`idCategoria-${item.id}`} value={item.id}>{item.descripcion}</option>)}
										</select>
									</div>
									<div className="col-2">
										<select className="form-control mb-2 mr-sm-2" id="subcategoria" name="subcategoria" onChange={this.handleFilters} value={subcategoria} >
											<option value="0">Subcategoria</option>
											{subcategorias.map(item => <option key={`idSubcategoria-${item.id}`} value={item.id}>{item.descripcion}</option>)}
										</select>
									</div>
									<div className="col-2">
										<input type="text" className="form-control mb-2 mr-sm-2" id="nombre" name="nombre" placeholder="Nombre" onChange={this.handleFilters} value={nombre} />

									</div>
								</div>
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