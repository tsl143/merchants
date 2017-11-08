import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getMerchant } from '../../actions/merchant';
import Add from './Add';
import Styles from './style.scss';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.props.getMerchant(this.props.match.params.merchantId)
    }

    render() {
        return (
            <div>
                <Add data={this.props.merchant} mode="edit"/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMerchant: id => dispatch(getMerchant(id))
    }
}

const mapStateToProps = state => {
    return {
        merchant: state.merchants.merchant || []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);