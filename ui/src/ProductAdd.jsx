import React from 'react';
import PropTypes from 'prop-types';
import {
    Form, FormControl, FormGroup, ControlLabel, Button,
} from 'react-bootstrap';


export default class AddProduct extends React.Component {
    constructor() {
        // console.log('Add prod constructor');
        super();
        this.state = { value: '$' };
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    onChangeStatus(e) {
        this.setState({ status: e.target.value, changed: true });
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.productAdd;

        const product = {
            category: form.category.value,
            price: form.price.value,
            name: form.productName.value,
            image: form.imageURL.value,
        };
        const { addProduct } = this.props;
        addProduct(product);
        form.price.value = '';
        form.productName.value = '';
        form.imageURL.value = '';
        form.category.value = '';
        this.state.value = '$';
    }

    render() {
        const { value } = this.state;
        return (

            <div>
                <Form inline name="productAdd" onSubmit={this.handleSubmit}>

                    <FormGroup>
                        <ControlLabel>Category:</ControlLabel>
                        <FormControl name="category"
                            componentClass="select"
                            onChange={this.onChangeStatus}
                        >
                            <option value="Jackets">Jackets</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Shirts">Shirts</option>
                            <option value="Sweaters">Sweaters</option>
                            <option value="Accessories">Accessories</option>
                        </FormControl>

                    </FormGroup>

                    <FormGroup>
                        <ControlLabel>Price:</ControlLabel>
                        {' '}
                        <FormControl type="text" name="price" value={value} onChange={this.handleChange} />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <ControlLabel>Product Name:</ControlLabel>
                        {' '}
                        <FormControl type="text" name="productName" id="product" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Image URL:</ControlLabel>
                        {' '}
                        <FormControl type="text" name="imageURL" id="imageURL" />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                        <Button bsStyle="primary" type="submit">Add</Button>
                    </FormGroup>

                    {/* <div className="formStyle">
                        <label htmlFor="productname">
                            ProductName
                <br />

                            <input type="text" name="productName" id="product" />
                        </label>
                    </div> */}
                    {/* <div className="formStyle">
                        <label htmlFor="image">
                            Image Url
                <br />
                            <input type="text" name="imageURL" id="imageURL" />
                        </label>
                    </div> */}
                    {/*  <div>
                        <label htmlFor="addProduct">
                            <input type="submit" value="Add Product" />
                        </label>
                    </div> */}
                </Form>
            </div>
        );
    }
}


AddProduct.propTypes = {
    addProduct: PropTypes.func.isRequired,
};