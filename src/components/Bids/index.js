import React, { Component } from 'react';

import { sortBidsByDate } from '../../utility';
import BidsPopup from '../BidsPopup';
import Styles from './style.scss';

const MAX_BIDS_ON_LIST = 3;
export default class Bids extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showBids: false
        }
    }

    handleShowBids(showBids) {
        this.setState({ showBids })
    }

    prepareBids(bids) {
        return bids.map(entry => {
            return (
                <span className={Styles.bids} key={entry.id}>
                    {entry.amount}
                    <span className={Styles.carTitle}>
                        {entry.carTitle}
                    </span>
                </span>
            )
        });
    }

    render() {
    	const { bids } = this.props;
        const sortedBids = sortBidsByDate(bids) || [];
        let myBids = [];

        if(sortedBids.length > MAX_BIDS_ON_LIST) {
            let trimmedBids = [ ...sortedBids ];
            trimmedBids = trimmedBids.splice(0, MAX_BIDS_ON_LIST);
            myBids = this.prepareBids(trimmedBids);
            myBids.push(
                <span className={`${Styles.bids} ${Styles.moreBids}`} onClick={this.handleShowBids.bind(this, true)} key="moreBids">
                    ...
                </span>
            )

        }else{
            myBids = this.prepareBids(sortedBids)
        }

        return (
            <div id="bids">
        	    {myBids}
                {
                    (sortedBids.length > MAX_BIDS_ON_LIST) &&
                    this.state.showBids &&
                    <div id="bidsPopup">
                        <div className={Styles.overlay} />
                        <BidsPopup bids={sortedBids} showPopup={this.handleShowBids.bind(this, false)}/>
                    </div>
                }
                
            </div>
        )
    }
}
