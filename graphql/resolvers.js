const chinguFromResolver = require('./chingu-application-form/chingu-application-resolvers')
module.exports = {
  Query: {
    getChinguApplicationForm: chinguFromResolver.getChinguApplicationForm
  },
  Mutation: {
    submitChinguApplicationForm: chinguFromResolver.submitChinguApplicationForm
  }
}
