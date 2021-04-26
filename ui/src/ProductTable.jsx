import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Glyphicon, Tooltip, OverlayTrigger, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//const display$ = `$ ${productObj.price}`;
//const { productObj } = this.props;

const rowStyle = {
    border: '2px solid silver',
    padding: 4,
};
const ProductRow = withRouter(({ productObj, deleteProduct, index, location: { search } }) => {


    const selectLocation = { pathname: `/products/${productObj.id}`, search };
    const editTooltip = (
        <Tooltip id="close-tooltip" placement="top">Edit Issue</Tooltip>
    );

    const deleteTooltip = (
        <Tooltip id="delete-tooltip" placement="top">Delete Product</Tooltip>
    );

    function onDelete(e) {
        e.preventDefault();
        deleteProduct(index);
    }

    const tableRow = (
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
                <LinkContainer to={`/view/${productObj.id}`}>

                    <Button bsSize="xsmall">
                        <Glyphicon glyph="glyphicon glyphicon-camera" />
                    </Button>

                </LinkContainer>
                {/*  <a rel="noreferrer" href={`/#/view/${productObj.id}`}>

                </a> */}
            </td>
            <td style={rowStyle}>{/* <a href={`/#/edit/${productObj.id}`}>Edit</a> */}

                <LinkContainer to={`/edit/${productObj.id}`}>
                    <OverlayTrigger delayShow={1000} overlay={editTooltip}>
                        <Button bsSize="xsmall">
                            <Glyphicon glyph="edit" />
                        </Button>
                    </OverlayTrigger>
                </LinkContainer>
                {' | '}

                <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
                    <Button bsSize="xsmall" onClick={onDelete}>
                        <Glyphicon glyph="trash" />
                    </Button>
                </OverlayTrigger>

            </td>
        </tr >
    );

    return (
        <LinkContainer to={selectLocation}>
            {tableRow}
        </LinkContainer>
    );
});



export default function ProductTable({ products, deleteProduct }) {

    const rowStyle = {
        border: '2px solid silver',
        padding: 4,
        backgroundColor: ' #d9d9d9',
    };
    //const {products} = this.props;
    const productRow = products.map((product, index) => (
        <ProductRow
            key={product.id}
            rowStyle={rowStyle}
            productObj={product} deleteProduct={deleteProduct} index={index}
        />
    ));
    return (
        <Table bordered condensed hover responsive>
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
        </Table>
    );

}