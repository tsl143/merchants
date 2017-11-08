import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMerchants, getMerchantsCount } from '../../actions/merchant';
import Grid from '../Grid';
import Pagination from '../Pagination';
import Styles from './style.scss';

const PAGE_SIZE = 10;

class List extends Component {

    constructor(props) {
        super(props);
        this.fetchData();
    }

    fetchData() {
        this.props.getMerchantsCount();
        this.props.getMerchants(this.props.currentPage);
    }

    paginate(page) {
    	this.props.getMerchants(page);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isRefresh){
            this.fetchData();
        }
    }

    render() {
        const { currentPage, isLoading, merchants, merchantsCount } = this.props;
        const pagesCount = Math.ceil(merchantsCount/PAGE_SIZE);

        return (
        	<div>
                <h3 id="merchantHead" className={Styles.pageheading}>
                    Merchants <span>{merchantsCount} merchants</span>
                    <Link to="/merchants">Add</Link>
                </h3>
            	<Grid data={merchants}/>
            	{ pagesCount > 1 &&
            		<Pagination count={merchantsCount} pagesCount={pagesCount} page={currentPage} paginate={this.paginate.bind(this)}/>
            	}
                { this.props.isLoading &&
                    <div id="loaderOverlay"><div id="loader" /></div>
                }
            </div>
        );        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMerchants: (page) => dispatch(getMerchants(page)),
        getMerchantsCount: () => dispatch(getMerchantsCount())
    }
}

const mapStateToProps = state => {
    return {
        merchants: state.merchants.dataList || [],
        merchantsCount: state.merchants.count || 0,
        currentPage: state.merchants.page || 1,
        isRefresh: state.merchants.isRefresh || false,
        isLoading: state.merchants.isLoading || false,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);