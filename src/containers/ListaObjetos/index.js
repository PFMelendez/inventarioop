import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class ListaObjetos extends Component {
  inventary = {
    objects: [
      {
        id: 1,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'
      },
      {
        id: 2,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'     
      },
      {
        id: 3,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'     
      },
      {
        id: 4,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'     
      },
      {
        id: 5,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'     
      },
      {
        id: 6,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'     
      },
      {
        id: 7,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'     
      },
      {
        id: 8,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'     
      },
      {
        id: 9,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'     
      },
      {
        id: 10,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'     
      },
      {
        id: 11,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'     
      },
      {
        id: 12,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'     
      },
      {
        id: 13,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
        more: 'ver más'     
      },
      {
        id: 14,
        name: 'laptop',
        category: 'Electrónicos',
        subcategory: 'Computadoras',
        image: '[Image]',
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
      text: 'Nombre'
    },
    {
      dataField: 'category',
      text: 'Categoría',
    },
    {
      dataField: 'subcategory',
      text: 'Subcategoría',
    },
    {
      dataField: 'image',
      text: 'Imagen',
    },
    {
      dataField: 'more',
      text: 'Detalle'
    }
  ]
  }
  
  render() {
    return (
      <div className="container-fluid">
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header"> Listado de Objetos </div>
              <div className="container" style={{ marginTop: 50 }}>     
                <BootstrapTable 
                striped
                hover
                keyField='id'
                data={ this.inventary.objects }
                columns={ this.inventary.fields }
                pagination={ paginationFactory() }/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListaObjetos;