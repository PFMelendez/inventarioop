import React, { Component } from 'react';

export default class TagItem extends Component {
    constructor(props){
        super(props);
        this.state ={isEdit:false}
        this.editTag = this.editTag.bind(this);
        this.editTagSubmit = this.editTagSubmit.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
    }

    deleteTag(){
        const {id} = this.props.tag;
        this.props.deleteTag(id);
    }

    editTag(){
        this.setState((prevState,props) => ({
        isEdit : !prevState.isEdit
        }))
    }

    editTagSubmit(){
        const {id} = this.props.tag;
        this.setState((prevState,props) => ({
        isEdit : !prevState.isEdit
        }));
        this.props.editTagSubmit(id,this.nameInput.value,this.categoryInput.value);
    }
    
    render() {
        const {id,name,category} = this.props.tag;
        return (
        this.state.isEdit === true ?
        <tr className="bg-warning" key={this.props.index}>
            <td><input ref={id => this.id = id} defaultValue ={id}/></td>
            <td><input ref={nameInput => this.nameInput = nameInput} defaultValue ={name}/></td>
            <td><input defaultValue={category} ref={categoryInput => this.categoryInput = categoryInput}/></td>
            <td><i className="far fa-save" onClick={this.editTagSubmit}></i></td>
            <td><i className="fas fa-trash"></i></td>
        </tr>
        :
        <tr key={this.props.index}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{category}</td>
            <td><i className="far fa-edit" onClick={this.editTag}></i></td>
            <td><i className="fas fa-trash" onClick={this.deleteTag}></i></td>
        </tr>
        );
    }
}