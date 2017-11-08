import React, { Component } from 'react';

import Styles from './style.scss';

const PAGE_SIZE = 10;

export default class Notification extends Component {

    constructor(props) {
        super(props);
        this._ismounted = true;
    }

    componentWillUnmount() {
        this._ismounted = false;   
    }

    componentDidMount() {
        window.setTimeout(()=>{
            if(this._ismounted)
                this.props.close();
        },2000)
    }

    render() {
        const { message, type } = this.props;
        return (
        	<div className={`${Styles.notification} ${Styles[type]}`}>
                <div className={Styles.heading}>{type}</div>
                <div className={Styles.message}>{message}</div>
            </div>
        );        
    }
}

