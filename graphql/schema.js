const {join} = require('path')
const {importSchema} = require('graphql-import')
const resolvers = require('./resolvers')

const typeDefs = importSchema(join(__dirname, './index.graphql'))

module.exports = {
  typeDefs,
  resolvers
}
