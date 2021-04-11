const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

const GraphQLPrice = new GraphQLScalarType({
    name: "GraphQLPrice",
    description: "Price custom scalar type",
    serialize(value) {
        //console.log("Serialize ", value);
        return value.toString();
    },

    parseValue(value) {
        console.log("before parseValue ", value);
        let first = value.toString().replace(/[$]/g, "");
        console.log("after parseValue ", first);
        return first;
    },

    parseLiteral(ast) {
        const temp = ast.value;
        console.log("First parseLiteral ", ast);
        console.log("First Literal ", ast);
        if (ast.kind == Kind.Float) {
            let first = value.toString().replace(/[$]/g, "");
            console.log("First Literal ", first);
            return first;
        }
        return temp;
    },
});

module.exports = GraphQLPrice;