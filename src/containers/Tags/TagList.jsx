import React, { Component } from 'react';
import TagItem from './TagItem.jsx';

export default class TagList extends Component {
    render() {
        let tags = this.props.tagList;
        const trItem = tags.map((item, index) => (
            <TagItem
                key={index}
                tag={item}
                index={index}
                editTagSubmit={this.props.editTagSubmit}
                deleteTag={this.props.deleteTag}
            />
        ))
        return (
            <tbody>{trItem}</tbody>
        );
    }
}