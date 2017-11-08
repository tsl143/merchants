import React, { Component } from 'react';

import { getDateFromTime, sortBidsByDate } from '../../utility';
import Styles from './style.scss';

export default class BidsPopup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order: 'DESC'
        }
        this.changeSort = this.changeSort.bind(this);
    }

    handleClose() {
        this.props.showPopup(false);
    }

    changeSort() {
        this.setState( prevState => {
            const order = prevState.order == 'DESC'? 'ASC': 'DESC';
            return { order }
        })
    }

    render() {
        const { bids } = this.props;
        const sortedBid = sortBidsByDate(bids, this.state.order)
        const bidDivs = bids.map(bid => {
            return (
                <tr key={bid.id}>
                    <td key={`${bid.carTitle}-${bid.id}`}>{bid.carTitle}</td>
                    <td key={`${bid.amount}-${bid.id}`}>{bid.amount}</td>
                    <td key={`${bid.created}-${bid.id}`}>{getDateFromTime(bid.created)}</td>
                </tr>
            )
        });

        return(
            <div className={Styles.bidPopup}>
                <h3>Bids</h3>
                <a onClick={this.handleClose.bind(this)}>X</a>
                <div className={Styles.tableHolder}>
                    <table className={Styles.bidsTable}>
                        <thead>
                            <tr key="bidshead">
                                <th>Car</th>
                                <th>Amount</th>
                                <th id="sortBids" onClick={this.changeSort}>
                                    Created
                                    {
                                        this.state.order=='DESC' &&
                                        <span className={Styles.sortSign}> &#9660;</span>
                                    }
                                    {
                                        this.state.order=='ASC' &&
                                        <span className={Styles.sortSign}> &#9650;</span>
                                    }
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>{bidDivs}</tbody>
                    </table>
                </div>
            </div>
        )
    }	
}

