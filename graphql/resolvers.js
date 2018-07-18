const chinguFromResolver = require('./chingu-application-form/chingu-application-resolvers')
module.exports = {
  Query: {},
  Mutation: {
    submitChinguApplicationForm: chinguFromResolver.submitChinguApplicationForm
  }
}
