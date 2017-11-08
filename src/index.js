import React from 'react';
import { render as ReactDomRender } from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import ReduxStore from './reducers/store';
import List from './components/List';
import Add from './components/Merchant/Add';
import Edit from './components/Merchant/Edit';

ReactDomRender(
    <Provider store={ReduxStore}>
        <HashRouter>
            <div>
                <Route exact path="/" component={List} />
                <Route exact path="/merchants" component={Add} />
                <Route path="/merchant/:merchantId" component={Edit} />
            </div>
        </HashRouter>
    </Provider>,
    document.getElementById('app')
);
