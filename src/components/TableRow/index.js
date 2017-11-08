import React, { Component } from 'react';
import { connect } from 'react-redux';

import { deleteMerchant } from '../../actions/merchant';
import { getFullName } from '../../utility';
import { Link } from 'react-router-dom';
import Bids from '../Bids';
import Styles from './style.scss';

class TableRow extends Component {

    constructor(props) {
        super(props);
    }

    deleteMerchant(id) {
        const res = confirm("Do you want to delete this merchant?");
        if (res) {
            this.props.deleteMerchant(id);
        } 
    }

    render() {
    	const { data } = this.props;
    	let rowData = [];

		if(data){
    		rowData = data.map(entry => {
	    		return(
	    			<tr key={entry.id} className={Styles.row} >
	    				<td><span className={Styles.avtar}><img src={entry.avatarUrl}/></span></td>
	    				<td><span>{getFullName({ first: entry.firstname, last: entry.lastname })}</span></td>
	    				<td><span>{entry.email}</span></td>
	    				<td><span>{entry.phone}</span></td>
	    				<td><span className={entry.hasPremium? `${Styles.premium} ${Styles.yes}`: `${Styles.premium} ${Styles.no}`}></span></td>
	    				<td><span className={Styles.bids}><Bids bids={entry.bids} /></span></td>
	    				<td className={Styles.actions}>
                            <Link title="Edit" to={`/merchant/${entry.id}`}>&#9998;</Link>
                            <a title="Delete" onClick={this.deleteMerchant.bind(this, entry.id)}>&#128465;</a>
                            
                        </td>
	    			</tr>
	    		)
	    	});
    	}
        return (
        	<tbody>
        		{rowData}
                {rowData.length==0 &&
                    <tr className={`${Styles.row} ${Styles.noRow}`}><td colSpan="7">No data</td></tr>
                }
        	</tbody>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    merchants: state.merchants.dataList || [],
  }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteMerchant: (id) => dispatch(deleteMerchant(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableRow);

