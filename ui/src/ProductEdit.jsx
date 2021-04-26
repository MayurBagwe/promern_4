import React from 'react';
import { Link } from 'react-router-dom';

import graphQLFetch from './graphQLFetch.js';
import NumInput from './NumInput.jsx';
import TextInput from './TextInput.jsx';
import {
    Col, Panel, Form, FormGroup, FormControl, ControlLabel,
    ButtonToolbar, Button, Alert,
} from 'react-bootstrap';


/* export default function ProductEdit({ match }) {
    const { id } = match.params;
    return (
        <h2>{`This is a placeholder for editing product ${id}`}</h2>
    );
} */

export default class ProductEdit extends React.Component {
    // to store the current value of each input
    constructor() {
        super();
        this.state = {
            product: {},
            showingValidation: false,
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps) {
        const { match: { params: { id: prevId } } } = prevProps;
        const { match: { params: { id } } } = this.props;
        if (id !== prevId) {
            this.loadData();
        }
    }

    onChange(event, naturalValue) {
        const { name, value: textValue } = event.target;
        const value = naturalValue === undefined ? textValue : naturalValue;
        this.setState((prevState) => ({
            product: { ...prevState.product, [name]: value },
        }));
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.showValidation();
        const { product, invalidFields } = this.state;

        const query = `mutation productUpdate(
            $id: Int!
            $changes: ProductUpdateInputs!
            ) {
            productUpdate(
            id: $id
            changes: $changes
            ) {
                id name price image category
            }
            }`;

        const { id, created, ...changes } = product;
        const data = await graphQLFetch(query, { changes, id });
        if (data) {
            this.setState({ product: data.productUpdate });
            //  alert('Updated product successfully'); // eslint-disable-line no-alert
        }
        console.log(product); // eslint-disable-line no-console
    }

    // replacing the empty product with product fetched from the server.
    async loadData() {
        const query = `query product($id: Int!) {
     product(id: $id){
        id name price image category
      }
    }`;
        // to fetch the data from the productlist when edit button is clicked
        const { match: { params: { id } } } = this.props;
        const data = await graphQLFetch(query, { id });


        this.setState({ product: data ? data.product : {}, invalidFields: {} });


    }

    showValidation() {
        this.setState({ showingValidation: true });
    }
    dismissValidation() {
        this.setState({ showingValidation: false });
    }

    render() {
        const { invalidFields, showingValidation } = this.state;
        const { product: { id } } = this.state;
        const { match: { params: { id: propsId } } } = this.props;
        if (id == null) {
            // if the id field is not valid
            if (propsId != null) {
                return <h3>{`Product with ID ${propsId} not found.`}</h3>;
            }
            return null;
        }

        const { product: { category } } = this.state;
        const { product: { price } } = this.state;
        const { product: { name } } = this.state;
        const { product: { image } } = this.state;

        return (
            /*  <Panel>
                 <Panel.Heading>
                     <Panel.Title>{`Editing Product: ${id}`}</Panel.Title>
                 </Panel.Heading>
                 <Panel.Body>
                     <Form horizontal onSubmit={this.handleSubmit}>
 
 
                     </Form>
 
 
 
 
                 </Panel.Body>
 
             </Panel> */

            <form onSubmit={this.handleSubmit}>
                <h3>{`Editing product: ${id}`}</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Category:</td>
                            <td>
                                <select name="category" value={category} onChange={this.onChange}>

                                    <option value="Shirts">Shirts</option>
                                    <option value="Jeans">Jeans</option>
                                    <option value="Jackets">Jackets</option>
                                    <option value="Sweaters">Sweaters</option>
                                    <option value="Accessories">Accessories</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>ProductName:</td>
                            <td>
                                <TextInput
                                    name="name"
                                    value={name}
                                    onChange={this.onChange}
                                    key={id}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>
                                <NumInput
                                    name="price"
                                    value={price}
                                    onChange={this.onChange}
                                    key={id}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Image:</td>
                            <td>
                                <TextInput
                                    name="image"
                                    value={image}
                                    onChange={this.onChange}
                                    key={id}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td />
                            <td><button type="submit">Submit</button></td>
                        </tr>
                    </tbody>
                </table>
                <Link to={`/edit/${id - 1}`}>Prev</Link>
                {' | '}
                <Link to={`/edit/${id + 1}`}>Next</Link>

            </form>


        )


    }


}