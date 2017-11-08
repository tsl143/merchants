import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import Notification from '../Notification';
import { saveMerchant, updateMerchant } from '../../actions/merchant';
import { getTime, validateInput } from '../../utility'
import Styles from './style.scss';

class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            avatarUrl: '',
            hasPremium: false,
            bids: [],
            showNotification: false,
            redirect: false,
            validation: true,
            isError: false,
            errorMessage: ''
        };
        this.saveMerchant = this.saveMerchant.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.mode === 'edit'){
            for (let key in nextProps.data) {
                if (nextProps.data.hasOwnProperty(key)) {
                    this.setState({
                        [key]: nextProps.data[key]
                    })
                }
            }    
        }

        if(nextProps.saveData && nextProps.isSaved) {
            let isError = true;
            let notificationMessage = 'Unable to save Data.';
            if(nextProps.saveData.id){
                isError = false;
                notificationMessage = 'Data successfully saved.';
            }
            this.setState({
                showNotification: true,
                isError,
                notificationMessage
            });

            if(!isError){
                window.setTimeout(()=>{
                    this.setState({
                        redirect: true,
                    });
                },1000);
            }
        }
    }

    handleInputChange(name, e) {
        const value = e.target.value || '';
        this.setState({ [name]: value });
    }

    handleCheckboxChange(name, e) {
        this.setState((prevState) => {
            const hasPremium = prevState.hasPremium ? false : true;
            return { hasPremium }
        });
    }

    addBid() {
        this.setState((prevState) => {
            const { bids } = { ...prevState };
            const created = getTime();
            bids.push({ 
                id: created,
                amount:'',
                carTitle: '',
                created
            });
            return { bids }
        });
    }

    handleBidChange(index, name, e) {
        let value = e.target.value || '';
        value =(name ==='amount' && value !=='') ? parseInt(value, 10): value;
        this.setState((prevState) => {
            const { bids } = { ...prevState };
            bids[index][name] = value;
            return { bids }
        });
    }

    checkValidations(data){
        let allSet = true;
        let errorMessage = '';

        if(!validateInput(data.firstname,['required','text'])) {
            allSet = false;
            errorMessage = 'First Name not Valid (only text)';
        }
        if(allSet && !validateInput(data.lastname,['required','text'])) {
            allSet = false;
            errorMessage = 'Last Name not Valid (only text)'
        }
        if(allSet && !validateInput(data.email,['required','email'])) {
            allSet = false;
            errorMessage = 'Email not Valid';
        }
        if(allSet && !validateInput(data.phone,['required','number'])) {
            allSet = false;
            errorMessage = 'Phone number not Valid (only numbers)';
        }
        if(allSet && !validateInput(data.avatarUrl,['required','url'])) {
            allSet = false;
            errorMessage = 'Avatar URL not Valid (only valid URL)';
        }
        if(allSet && data.bids.length != 0) {
            data.bids.forEach(bid => {
                if(!validateInput(bid.carTitle,['required','alphaNumeric'])) {
                    allSet = false;
                    errorMessage = 'Car Name not Valid (only alphabets and numbers)';
                }
                if(allSet && !validateInput(bid.amount,['required','number'])) {
                    allSet = false;
                    errorMessage = 'Amount not Valid (only numbers)';
                }
                if(!allSet) return false;
            });
        }

        this.setState({ 
            validation: allSet,
            errorMessage
        });

        if(allSet){
            return true;
        }else{
            return false;
        }
    }

    saveMerchant() {
        const data = { ... this.state }
        const removeKey = ['showNotification', 'redirect', 'validation', 'isError', 'errorMessage'];
        removeKey.forEach(key => delete data[key]);

        if(!this.checkValidations(data))
            return false;

        if(this.state.id !=='')
            this.props.updateMerchant(data);
        else
            this.props.saveMerchant(data)

    }

    closeNotification() {
        this.setState({
            showNotification: false
        })
    }

    removeBid(id) {
        let bids = [ ...this.state.bids ];
        bids = bids.filter( entry => entry.id != id);
        this.setState({ bids });
    }

    render() {
        const bids = this.state.bids.map( (bid, index) => {
            return (
                <div className={Styles.merchantBids} key={index}>
                    <div data-label="Car Title" className={Styles.inputHolder}>
                        <input
                            className={Styles.input}
                            placeholder="Car Title"
                            onChange={this.handleBidChange.bind(this, index, 'carTitle',)}
                            value={this.state.bids[index].carTitle}
                        />
                    </div>
                    <div data-label="Amount" className={Styles.inputHolder}>
                        <input
                            className={Styles.input}
                            placeholder="Amount"
                            onChange={this.handleBidChange.bind(this, index, 'amount')}
                            value={this.state.bids[index].amount}
                        />
                    </div>
                    <a onClick={this.removeBid.bind(this, bid.id)}>X</a>
                </div>
            )
        });

        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }

        return (
            <div>
                {this.state.showNotification &&
                    <Notification close={this.closeNotification.bind(this)} type={this.state.isError? 'error': 'success'} message={this.state.notificationMessage}/>
                }
                <div className={Styles.merchantHolder}>
                    <div className={Styles.merchant} data-label="Merchant Details">
                        <div data-label="First Name" className={Styles.inputHolder}>
                            <input
                                className={Styles.input}
                                placeholder="First Name"
                                onChange={this.handleInputChange.bind(this, 'firstname')}
                                value={this.state.firstname}
                            />
                        </div>
                        <div data-label="Last Name" className={Styles.inputHolder}>
                            <input
                                className={Styles.input}
                                placeholder="Last Name"
                                onChange={this.handleInputChange.bind(this, 'lastname')}
                                value={this.state.lastname}
                            />
                        </div>
                        <div data-label="Email" className={Styles.inputHolder}>
                            <input
                                className={Styles.input}
                                placeholder="Email"
                                onChange={this.handleInputChange.bind(this, 'email')}
                                value={this.state.email}
                            />
                        </div>
                        <div data-label="Phone" className={Styles.inputHolder}>
                            <input
                                className={Styles.input}
                                placeholder="Phone"
                                onChange={this.handleInputChange.bind(this, 'phone')}
                                value={this.state.phone}
                            />
                        </div>
                        <div data-label="Avatar URL" className={Styles.inputHolder}>
                            <input
                                className={Styles.input}
                                placeholder="Avatar URL"
                                onChange={this.handleInputChange.bind(this, 'avatarUrl')}
                                value={this.state.avatarUrl}
                            />
                        </div>
                        <div data-label="Premium" className={Styles.inputHolder}>
                            <input
                                type="checkbox"
                                onChange={this.handleCheckboxChange.bind(this, 'premium')}
                                checked={this.state.hasPremium}
                            />
                        </div>
                        
                    </div>
                    <div className={Styles.merchant} data-label="Merchant Bids">
                        <a className={Styles.addBids} onClick={this.addBid.bind(this)}>ADD BIDS</a>
                        {bids}
                    </div>
                </div>
                {!this.state.validation &&
                    <div className={Styles.error}>
                        {this.state.errorMessage}
                    </div>
                }
                <div className={Styles.actions}>
                    <Link className={Styles.save} to="/">Cancel</Link>
                    <button 
                        className={Styles.save}
                        onClick={this.saveMerchant}
                    >
                        Save
                    </button>
                </div>
                { this.props.isLoading &&
                    <div id="loaderOverlay"><div id="loader" /></div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveMerchant: data => dispatch(saveMerchant(data)),
        updateMerchant: data => dispatch(updateMerchant(data))
    }
}

const mapStateToProps = state => {
    return {
        saveData: state.merchants.saveData || {},
        isSaved: state.merchants.isSaved || false,
        isLoading: state.merchants.isLoading || false
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);