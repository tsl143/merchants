import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import React from 'react';

import store from '../src/reducers/store';
import List from '../src/Components/List';

const props = { 
	merchants: {
		dataList: [],
        count: 0,
        page: 1,
        delete: false,
	} ,
	getMerchants: jest.fn(),
	getMerchantsCount: jest.fn(),
}

describe('List Component', () => {

    it('should render without errors', () => {
        const wrapper = mount(<List { ...props } />, { context: { store } });
      	expect(wrapper.length).toEqual(1);
    });

    it('should render h3', () => {
        const wrapper = mount(<List { ...props } />, { context: { store } });
      	expect(wrapper.find('#merchantHead').length).toEqual(1);
    });

    it('should render a table', () => {
        const wrapper = mount(<List { ...props } />, { context: { store } });
      	expect(wrapper.find('table').length).toEqual(1);
    });

});