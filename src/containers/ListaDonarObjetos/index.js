import React, { Component } from 'react';
//import { Button, Form } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import moment from 'moment';
import api from '../../services/api';

// const { SearchBar, ClearSearchButton } = Search;


class ListaDonarObjetos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			objetos: [],
			page: 0,
		};
		this.loadNext = this.loadNext.bind(this);
		this.loadLast = this.loadLast.bind(this);
		this.donarObjetos = this.donarObjetos.bind(this);
		this.donarObjeto = this.donarObjeto.bind(this);
		this.buttonFormatter = this.buttonFormatter.bind(this);
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

	donarObjetos() {
		const { objetos } = this.state;
		const that = this;
		const conf = confirm('Confirme la salida de los objetos.');
		if (conf) {
			const objetosIds = objetos.map(item => item.id);
			api.objetos.donate({ objetos: objetosIds })
				.then(() => {
					alert('Todos los objetos de esta pagina han salido del inventario');
					api.objetos.listDonate(0)
						.then(response => {
							const { objetos } = response.data;
							that.setState({ objetos, page: 0 });
						})
						.catch(err => {
							console.log(err)
							alert('Error al cargar los objetos.');
						})
				})
				.catch(err => {
					console.log(err);
					alert('Error al donar los objetos');
				})
		}
	}

	donarObjeto(id) {
		const that = this;
		const conf = confirm('Confirme la salida del objeto.');
		if (conf) {
			api.objetos.donate({ objetos: [id] })
				.then(() => {
					alert('El objeto ha salido del inventario');
					api.objetos.listDonate(0)
						.then(response => {
							const { objetos } = response.data;
							that.setState({ objetos, page: 0 });
						})
						.catch(err => {
							console.log(err)
							alert('Error al cargar los objetos.');
						})
				})
				.catch(err => {
					console.log(err);
					alert('Error al donar los objetos');
				})
		}
	}

	imageFormatter(cell) {
		return (
			<img src={cell} height={'50'} alt='objeto' />
		);
	}

	buttonFormatter(cell, row) {
		const cb = () => this.donarObjeto(cell, row);
		return (
			<button type="button" className="btn btn-primary" onClick={cb}>Donar</button>
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
									<span>Listado de objetos disponibles para donar</span>
									<button type="button" className="btn btn-primary" onClick={this.donarObjetos} style={{ float: 'right' }}>Donar Todos</button>
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