import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';
import Provider from 'react-redux';

import store from '../src/reducers/store';
import Edit from '../src/Components/Merchant/Edit';
import Add from '../src/Components/Merchant/Add';

const merchant = {
    "id": "9ROEfw9",
    "firstname": "Test",
    "lastname": "Again",
    "email": "abc@abc.com",
    "phone": "9876787654",
    "avatarUrl": "testurl",
    "hasPremium": true,
    "bids": []
}
const match = {
    params: {
        merchantId: 3
    }
}

function setup() {

    const getMerchant = jest.fn()
  const component = shallow(
    <Provider store={store}>
    <Edit
      merchant={merchant}
      getMerchant={getMerchant}
      match={match} />
    </Provider>
  )

  return {
    component: component
  }
}

describe('Add Component', () => {
    let wrapper;
    it('should add .merchantBids block on add bids click', () => {
        //console.log(Edit.instance())
        //const { component } = setup('reactjs')
        //console.log(component)
        //expect(wrapper.find('.merchantBids').length).toEqual(1);
    });
});