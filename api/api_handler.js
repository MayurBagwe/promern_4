const fs = require('fs');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');

const GraphQLPrice = require('./graphql_price.js');
const about = require('./about.js');
const product = require('./product.js');


const resolvers = {
    Query: {
        about: about.getMessage,
        productsList: product.list,
        product: product.get
    },
    Mutation: {
        setAboutMessage: about.setMessage,
        productsAdd: product.add,
        productUpdate: product.update,
        productDelete: product.delete,
    },
    GraphQLPrice,
};

const server = new ApolloServer({
    typeDefs: fs.readFileSync("schema.graphql", "utf-8"),
    resolvers,
    formatError: (error) => {
        console.log(error);
        return error;
    },
});


function installHandler(app) {
    const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
    console.log('CORS setting:', enableCors);
    server.applyMiddleware({ app, path: '/graphql', cors: enableCors });
}


module.exports = { installHandler };