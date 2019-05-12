import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const { SearchBar, ClearSearchButton } = Search;

function imageFormatter(cell, row) {
  return(
    <img src={cell} height = { '50' }></img>
  );
}

function urlFormatter(cell, row) {
  return(
    <a href='detalle/objeto' style = { {color: '#343a3f'} }> {cell} &nbsp; <i className="fas fa-external-link-alt" ></i> </a>
  );
}

class ListaObjetos extends Component {
  inventary = {
    objects: [
      {
        id: 1,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'
      },
      {
        id: 2,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      },
      {
        id: 3,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      },
      {
        id: 4,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      },
      {
        id: 5,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      },
      {
        id: 6,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      },
      {
        id: 7,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      },
      {
        id: 8,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      },
      {
        id: 9,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      },
      {
        id: 10,
        name: 'Iphone 7',
        category: 'Electrónicos',
        subcategory: 'Celulares',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      },
      {
        id: 11,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      },
      {
        id: 12,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      },
      {
        id: 13,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      },
      {
        id: 14,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: 'https://screenshotlayer.com/images/assets/placeholder.png',
        more: 'ver más'     
      }
    ],

    fields: [{
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
      formatter: imageFormatter,style: {
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
  ]
  }
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h5>Listado de Objetos</h5>
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
                    <SearchBar { ...props.searchProps } />
                    <ClearSearchButton { ...props.searchProps } />
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

export default ListaObjetos;