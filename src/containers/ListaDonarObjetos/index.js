import React, { Component } from 'react';
//import { Button, Form } from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar, ClearSearchButton } = Search;

function donarObjeto(props){
    console.log(" se dona el objeto con el id -> "+props.id);
}

function imageFormatter(cell, row) {
  return(
    <img src={cell} height = { '50' }></img>
  );
}

function dateFormatter(cell, row) {
    return(
      <p>{cell}</p>
    );
  }

function buttonFormatter(cell, row) {
    return(
        <button type="button" className="btn btn-primary" onClick={donarObjeto({row})}>Donar</button>
    );
}


class ListaDonarObjetos extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
      }
     
    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    donarObjetos(){
        console.log(" se donan todos test");
    }

    inventary = {
        objects: [
        {
            id: 1,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: ''
        },
        {
            id: 2,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: ''
        },
        {
            id: 3,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: ''
        },
        {
            id: 4,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: '' 
        },
        {
            id: 5,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: ''   
        },
        {
            id: 6,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: ''
        },
        {
            id: 7,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: ''
        },
        {
            id: 8,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: ''    
        },
        {
            id: 9,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: ''
        },
        {
            id: 10,
            name: 'Iphone 7',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: ''
        },
        {
            id: 11,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: ''
        },
        {
            id: 12,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: ''
        },
        {
            id: 13,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: '' 
        },
        {
            id: 14,
            name: 'laptop',
            date_in: '13/02/19',
            image: 'https://screenshotlayer.com/images/assets/placeholder.png',
            donate: ''
        }
        ],

        fields: [{
        dataField: 'name',
        text: 'Nombre',
        style: {
            width: '150px'
        }
        },
        {
        dataField: 'date_in',
        text: 'Fecha Ingreso',
        formatter: dateFormatter,style: {
            width: '150px',
        }
        },
        {
        dataField: 'image',
        text: 'Imagen',
        align: 'center',
        formatter: imageFormatter,style: {
            width: '150px'
        }
        },
        {
            dataField: 'donate',
            text: '',
            align: 'center',
            formatter: buttonFormatter,style: {
                width: '150px',
            }
            }
    ]
    }

  
    render() {
        return (
        <div className="container-fluid">
            <div className="row mt-3">
            <div className="col-lg-12">
                <div className="card">
                <div className="card-header">
                    <h5>Listado de objetos disponibles para donar</h5>
                </div>
                <div className="container" style={{ marginTop: 50 }}>    
                <ToolkitProvider
                    keyField='id'
                    data={ this.inventary.objects }
                    columns={ this.inventary.fields }
                    search
                >
                {
                    props => (
                    <div>
                        <h5> Filtrar: </h5>
                        <SearchBar { ...props.searchProps } />&nbsp;
                        <ClearSearchButton { ...props.searchProps } className="btn btn-light" />&nbsp;&nbsp;
                        <button type="button" className="btn btn-primary" onClick={this.donarObjetos} style={{ float: 'right' }}>Donar Todos</button>
                        <hr />
                        <BootstrapTable 
                        { ...props.baseProps } 
                        striped
                        hover
                        pagination={ paginationFactory() }
                        />
                    </div>
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