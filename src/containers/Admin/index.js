import React, { Component } from 'react';
import TagList from './TagList.jsx';
import './styles.css';

/* registros estaticos temporales, posteriormente se conectará con la bd*/ 

const tagList = [{id:1,name:'Reloj',category:'Personal'/*,subcategory:'Personal'*/},
                  {id:2,name:'Llave',category:'Personal'/*,subcategory:'Personal'*/},
                  {id:3,name:'Celular',category:'Electronica'/*,subcategory:'Telefonos'*/},
                  {id:4,name:'Laptop',category:'Electronica'/*,subcategory:'Computadoras'*/}];

if (localStorage.getItem("tags") === null)
  localStorage.setItem('tags', JSON.stringify(tagList));

class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagList: []
    }

    this.editTagSubmit = this.editTagSubmit.bind(this);
    this.deleteTag = this.deleteTag.bind(this);
    this.addNewTag = this.addNewTag.bind(this);
  }

  componentWillMount() {
    let tagList = JSON.parse(localStorage.getItem("tags"));
    this.setState((prevState, props) => ({
      tagList: tagList
    }));
  }

  addNewTag() {
    this.setState((prevState, props) => ({
      tagList: [...prevState.tagList, { id:Math.max(...prevState.tagList.map(function(o){return o.id})) + 1,name: '---', category: '---'}]
    }));
  }

  deleteTag(id) {
    let r = window.confirm("¿Seguro que deseas borrar esta etiqueta?");
    if (r === true) {
    let filteredTagList = this.state.tagList.filter(x => x.id !== id);
    this.setState((prevState, props) => ({
      tagList: filteredTagList
    }));
    localStorage.setItem('tags', JSON.stringify(filteredTagList));
    }
  }

  editTagSubmit(id,name, category, subcategory) {
    let tagListCopy = this.state.tagList.map((tag) => {
      if (tag.id === id) {
        tag.name = name;
        tag.category = category;
        //tag.subcategory = subcategory;
      }
      return tag;
    });
    this.setState((prevState, props) => ({
      tagList: tagListCopy
    }));
    localStorage.setItem('tags', JSON.stringify(tagListCopy));
  }

  render() {
    return (
    <div className="container-fluid">
    <div className="row mt-3"><div className="col-lg-12">
    <div className="card">
    <div className="card-header">
    Registro de Etiquetas
    </div>
    <div className="card-body">
    <table className="table table-hover">
    <thead className="thead-dark"><tr><th>Id</th><th>Nombre</th><th>Categoría</th><th>Editar/Guardar</th><th>Eliminar</th></tr></thead>
    <TagList deleteTag={this.deleteTag} tagList={this.state.tagList} editTagSubmit={this.editTagSubmit} />
    </table>
    <button className="btn btn-dark pull-left" onClick={this.addNewTag}>Agregar</button>
    </div></div></div></div></div>
    );
  }
}
export default Tags;