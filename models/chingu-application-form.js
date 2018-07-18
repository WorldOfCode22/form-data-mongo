const mongoose = require('mongoose')

const ChinguApplicationFormSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User id must be provided to Schema']
  },
  excitingAboutChingu: [{
    type: String
  }],
  valueOfChinguToUser: {
    type: String,
    required: [true, 'User provided empty response to question about chingu value to them'],
    maxlength: 300 // 300 char cap for open response
  }
})

ChinguApplicationFormSchema.pre('save', function () {
  return new Promise((resolve, reject) => {
    const checkBoxMinSelect = 1
    const checkBoxMaxSelect = 3
    const checkOptions = [
      'Being in a group of friendly coders who share my goals',
      'Having access to team project experiences',
      'Pair-Programing Opportunities',
      'Getting out of my comfort zone',
      'Help me when I get stuck on a coding problem',
      'MOTIVATION/ACCOUNTABILITY'
    ]
    // check number of checks
    if (this.excitingAboutChingu.length > checkBoxMaxSelect || this.excitingAboutChingu.length < checkBoxMinSelect) {
      reject(new Error('User selected to few or to many check boxes'))
    } else {
      // check valid checks
      for (let i = 0; i < this.excitingAboutChingu.length; i++) {
        if (checkOptions.indexOf(this.excitingAboutChingu[i]) < 0) {
          reject(new Error(`${this.excitingAboutChingu[i]} is not a valid check option`))
        }
      }
      // check for duplication
      var results = {}
      for (let i = 0; i < this.excitingAboutChingu.length; i++) {
        if (results[this.excitingAboutChingu[i]]) {
          reject(new Error('Checkbox value was entered more then once'))
        }
        results[this.excitingAboutChingu[i]] = this.excitingAboutChingu[i]
      }
      resolve()
    }
  })
})

const ChinguApplicationForm = mongoose.model('ChinguApplicationForm', ChinguApplicationFormSchema)

module.exports = ChinguApplicationForm
