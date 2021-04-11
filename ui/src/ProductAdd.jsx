import React from 'react';
import PropTypes from 'prop-types';


export default class AddProduct extends React.Component {
    constructor() {
        // console.log('Add prod constructor');
        super();
        this.state = { value: '$' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
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
                <form name="productAdd" onSubmit={this.handleSubmit}>
                    <div className="formStyle">
                        <label htmlFor="category">
                            Category
                <br />
                            <select name="category">
                                <option>Shirts</option>
                                <option>Jeans</option>
                                <option>Jackets</option>
                                <option>Sweaters</option>
                                <option>Accessories</option>
                            </select>
                        </label>
                    </div>
                    <div className="formStyle">
                        <label htmlFor="price">
                            Price Per Unit
                <br />
                            <input
                                type="text"
                                name="price"
                                value={value}
                                onChange={this.handleChange}
                            />
                        </label>
                    </div>

                    <div className="formStyle">
                        <label htmlFor="productname">
                            ProductName
                <br />

                            <input type="text" name="productName" id="product" />
                        </label>
                    </div>
                    <div className="formStyle">
                        <label htmlFor="image">
                            Image Url
                <br />
                            <input type="text" name="imageURL" id="imageURL" />
                        </label>
                    </div>
                    <div>
                        <label htmlFor="addProduct">
                            <input type="submit" value="Add Product" />
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}


AddProduct.propTypes = {
    addProduct: PropTypes.func.isRequired,
};