import React from 'react';

import ProductTable from './ProductTable.jsx';
import AddProduct from './ProductAdd.jsx';
import graphQLFetch from './graphQLFetch.js'
import URLSearchParams from 'url-search-params';
import { Route } from 'react-router-dom';
import { Panel } from 'react-bootstrap';

export default class ProductList extends React.Component {
    constructor() {
        //  console.log('Prod list constructor executed');
        super();
        this.state = {
            products: [],
        };
        this.addProduct = this.addProduct.bind(this);
        this.deleteProduct = this.deleteProduct.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }


    componentDidUpdate(prevProps) {
        const { location: { search: prevSearch } } = prevProps;
        const { location: { search } } = this.props;
        if (prevSearch !== search) {
            this.loadData();
        }
    }

    async loadData() {
        this.loadCount();
        const { location: { search } } = this.props;
        const params = new URLSearchParams(search);
        const vars = {};

        if (params.get('category')) vars.status = params.get('category');
        // constructing a GraphQL query
        const query = `query{
            productsList{
              id name price 
              category image
            }
          }`;

        const data = await graphQLFetch(query, vars);
        if (data) {
            //    console.log('Final data ', data);
            this.setState({ products: data.productsList });
        }
    }


    async loadCount() {
        const query = `query {
          productCount
        }`;
        const data = await graphQLFetch(query, this.showError);
        if (data) {
            this.setState({ count: data.productCount });
        }
    }

    async addProduct(product) {
        const query = `mutation productsAdd($product: ProductInputs!) {
        productsAdd(product: $product) {
          id
        }
      }`;

        const data = await graphQLFetch(query, { product });
        if (data) {
            this.loadData();
        }
    }

    async deleteProduct(index) {
        const query = `mutation productDelete($id: Int!) {
          productDelete(id: $id)
        }`;
        const { products } = this.state;
        const { location: { pathname, search }, history } = this.props;
        const { id } = products[index];
        const data = await graphQLFetch(query, { id });
        if (data && data.productDelete) {
            this.setState((prevState) => {
                const newList = [...prevState.products];
                if (pathname === `/products/${id}`) {
                    history.push({ pathname: '/products', search });
                }
                newList.splice(index, 1);
                return { products: newList };
            });
        } else {
            this.loadData();
        }
        this.loadCount();
    }

    render() {
        const { products, count } = this.state;
        return (
            <React.Fragment>
                {/* <AppHeader /> */}
                <Panel>
                    {/* <Panel.Heading>
                        <Panel.Title toggle>Filter</Panel.Title>
                    </Panel.Heading>
                    <Panel.Body collapsible>

                    </Panel.Body> */}
                    <Panel.Heading>
                        <Panel.Title toggle>
                            Showing
                            {' '}
                            {count}
                            {' '}
              available products
                        </Panel.Title>
                    </Panel.Heading>

                </Panel>
                {/*   <p>Showing all available products</p> */}
                <ProductTable products={products} deleteProduct={this.deleteProduct} />

                <h3 style={{ color: 'red' }}>Add a new product to inventory</h3>
                <AddProduct addProduct={this.addProduct} />
            </React.Fragment>
        );
    }
}