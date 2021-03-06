import axios from 'axios';
import Store from '../reducers/store';

const apiURL = "https://intense-tor-76305.herokuapp.com";
export function showLoader() {
    return {
        type: 'LOADER',
        payload: true
    };
}

export const getMerchants = page => {
    Store.dispatch(showLoader());
    page = page || 1;
	const dataUrl = `${apiURL}/merchants?_page=${page}`;
    return axios
    .get(dataUrl)
    .then( response => {
    	return {
    		type: 'LIST',
            payload: { data: response.data, count: response.headers['x-total-count'], page }
    	}
    })
    .catch( error => {
        return {
            type: 'LIST',
            payload: { data: 0, page, error }
        }
    } );
}

export const getMerchant = id => {
    Store.dispatch(showLoader());
    const dataUrl = `${apiURL}/merchants/${id}`;
    return axios
    .get(dataUrl)
    .then( response => {
        return {
            type: 'MERCHANT',
            payload: { data: response.data }
        }
    })
    .catch( error => {
        return {
            type: 'LIST',
            payload: { data: 0, error }
        }
    } );
}

export const deleteMerchant = id => {
    Store.dispatch(showLoader());
    const dataUrl = `${apiURL}/merchants/${id}`;
    return axios({
        method: 'DELETE',
        url: dataUrl
    })
    .then( response => {
        return {
            type: 'DELETE',
            payload: response.data
        }
    })
    .catch( error => {
        return {
            type: 'DELETE',
            payload: { data: 0, error }
        }
    } );
}

export const saveMerchant = data => {
    Store.dispatch(showLoader());
    const dataUrl = `${apiURL}/merchants/${data.id}`;
    return axios({
      method: 'POST',
      url: dataUrl,
      data
    })
    .then( response => {
        return {
            type: 'ADD',
            payload: response.data
        }
    })
    .catch( error => {
        return {
            type: 'ADD',
            payload: { data: 0, error }
        }
    } );
}

export const updateMerchant = data => {
    Store.dispatch(showLoader());
    if(!data.id){
        return {
            type: 'UPDATE',
            payload: 0
        }
    }

    const dataUrl = `${apiURL}/merchants/${data.id}`;
    
    return axios({
      method: 'PATCH',
      url: dataUrl,
      data
    })
    .then( response => {
        return {
            type: 'UPDATE',
            payload: response.data
        }
    })
    .catch( error => {
        return {
            type: 'UPDATE',
            payload: { data: 0, error }
        }
    } );
}