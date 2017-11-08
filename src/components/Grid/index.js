import React, { Component } from 'react';

import TableRow from '../TableRow';
import Styles from './style.scss';

export default class Grid extends Component {

    render() {
        const { data } = this.props;
        return (
            <table border="0" className={Styles.list}>
                <thead>
                    <tr>
                        <th colSpan="2">Merchant</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Premium</th>
                        <th>Bids</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <TableRow data={data} />
            </table>
        );        
    }
}
