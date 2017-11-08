import React, { Component } from 'react';

import Styles from './style.scss';

const PAGE_SIZE = 10;

export default class Pagination extends Component {

    constructor(props) {
        super(props);
    }

    handleClick(index, page) {
        if(index!= page)
            this.props.paginate(index);
    }

    setPages(count, page) {
        const pagination = [];

        for(let i=1; i <= count; i++){
            pagination.push(
                <a 
                    key={i}
                    className={i==page ? `${Styles.active} ${Styles.paginator}` : Styles.paginator}
                    onClick={this.handleClick.bind(this, i, page)}
                >
                    {i}
                </a>
            )
        }        
        return pagination;
    }

    render() {
        const { count, page, pagesCount } = this.props;
        return (
        	<div className={Styles.pagination}>{this.setPages(pagesCount, page)}</div>
        );        
    }
}

