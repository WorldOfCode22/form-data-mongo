require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {ApolloServer} = require('apollo-server-express')
const ChinguApplicationForm = require('./models/chingu-application-form')
const {typeDefs, resolvers} = require('./graphql/schema')

mongoose.connect(process.env.MONGO_URI)
  .then(
    () => console.log('Mongo DB Connected'),
    err => console.error(err)
  )

const app = express()

const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    req,
    models: {ChinguApplicationForm}
  })
})

gqlServer.applyMiddleware({ app, path: '/graphql' })

app.listen(process.env.PORT, () => {
  console.log(`Port: ${process.env.PORT}`)
})
