const { UserInputError } = require('apollo-server-express');
const { getDb, getNextSequence } = require('./db.js');

const productDB = [
    {
        id: 1,
        category: 'Shirts',
        name: "Levis Shirt",
        image: "Test",
        price: "400",
    },
    {
        id: 2,
        category: 'Jeans',
        name: "Levis Jeans",
        image: "Test",
        price: "800",
    },
];


async function list(_, { category }) {
    const db = getDb();
    const filter = {};
    if (category) filter.category = category;
    const products = await db.collection("products").find(filter).toArray();
    return products;
    //return productDB;
}

async function get(_, { id }) {
    const db = getDb();
    const product = await db.collection('products').findOne({ id });
    return product;
}

function validate(product) {
    console.log("Product ", product);
    const errors = [];
    if (product.name.length < 1) {
        errors.push('Field "productname" is mandatory.');
    }
    if (product.price) {
        console.log("Price ", product.price);
        var regex = /^\s*-?[0-9]\d*(\.\d{1,2})?\s*$/;
        if (!regex.test(product.price)) {
            errors.push('Field "Price" incorrect.');
        }
    }

    if (errors.length > 0) {
        throw new UserInputError("Invalid input(s)", { errors });
    }
}

// validating the products based on the new inputs
async function update(_, { id, changes }) {
    const db = getDb();
    if (changes.category || changes.name || changes.price || changes.image) {
        const product = await db.collection('products').findOne({ id });
        Object.assign(product, changes);
        validate(product);
    }
    // once validation succeeds, updateOne() function with $set operation is used to save the changes.
    await db.collection('products').updateOne({ id }, { $set: changes });
    const savedIssue = await db.collection('products').findOne({ id });
    return savedIssue;
}


async function add(_, { product }) {
    const db = getDb();
    validate(product);

    const newProduct = { ...product };
    // newProduct.id = productDB.length + 1;
    newProduct.id = await getNextSequence("products");
    //console.log("Before adding product ", product);
    //productDB.push(product);
    const result = await db.collection("products").insertOne(newProduct);

    console.log("Added product ", product);
    const savedProduct = await db
        .collection("products")
        .findOne({ _id: result.insertedId });
    return savedProduct;
    //return product;
}

async function remove(_, { id }) {
    const db = getDb();
    const product = await db.collection('products').findOne({ id });
    if (!product) return false;
    product.deleted = new Date();

    let result = await db.collection('deleted_products').insertOne(product);
    if (result.insertedId) {
        result = await db.collection('products').removeOne({ id });
        return result.deletedCount === 1;
    }
    return false;
}

module.exports = { list, add, get, update, delete: remove, };