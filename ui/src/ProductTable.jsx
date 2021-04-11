import React from 'react';
import { Link, withRouter } from 'react-router-dom';
//const display$ = `$ ${productObj.price}`;
//const { productObj } = this.props;

const rowStyle = {
    border: '2px solid silver',
    padding: 4,
};
const ProductRow = withRouter(({ productObj, deleteProduct, index }) => (




    <tr>
        <td style={rowStyle}>{productObj.name}</td>
        <td style={rowStyle}>${productObj.price}</td>
        <td style={rowStyle}>{productObj.category}</td>
        {/* <td style={rowStyle}>
            <a rel="noreferrer" target="_blank" href={productObj.image}>
                View
            </a>
        </td> */}
        <td style={rowStyle}>
            <a rel="noreferrer" href={`/#/view/${productObj.id}`}>
                View
            </a>
        </td>
        <td style={rowStyle}><a href={`/#/edit/${productObj.id}`}>Edit</a>
            <button type="button" onClick={() => { deleteProduct(index); }}>Delete</button></td>
    </tr>
));



export default function ProductTable({ products, deleteProduct }) {

    const rowStyle = {
        border: '2px solid silver',
        padding: 4,
        backgroundColor: ' #d9d9d9',
    };
    //const { products } = this.props;
    const productRow = products.map((product, index) => (
        <ProductRow
            key={product.id}
            rowStyle={rowStyle}
            productObj={product} deleteProduct={deleteProduct} index={index}
        />
    ));
    return (
        <table style={{ borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={rowStyle}>Product Name</th>
                    <th style={rowStyle}>Price</th>
                    <th style={rowStyle}>Category</th>
                    <th style={rowStyle}>Image</th>
                    <th style={rowStyle}>Action</th>
                </tr>
            </thead>
            <tbody>{productRow}</tbody>
        </table>
    );

}