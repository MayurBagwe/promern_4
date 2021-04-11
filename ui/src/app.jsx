import 'babel-polyfill';
import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

/* class AppHeader extends React.Component {
  render() {
    return (
      <div>
        <h1>My Company Inventory</h1>
        <h3 style={{ color: 'red' }}>Showing all available products</h3>
        <hr />
      </div>
    );
  }
} */

//import ProductList from './ProductList.jsx';

import Page from './Page.jsx';
//const element = <ProductList />;

const element = (
  <Router>
    <Page />
  </Router>
);

ReactDOM.render(element, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}