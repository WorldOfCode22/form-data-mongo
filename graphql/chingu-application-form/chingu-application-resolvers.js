module.exports = {
  submitChinguApplicationForm: (_, {input: {excitingAboutChingu, valueOfChinguToUser}}, {models: {ChinguApplicationForm}}) => {
    // save to users DB
    const userId = 2
    const minChecks = 1
    const maxChecks = 3
    const maxValueStringLength = 300
    const minValueStringLength = 20
    const enumToString = {
      'FRIENDLY_CODERS': 'Being in a group of friendly coders who share my goals',
      'TEAM_EXPERIENCE': 'Having access to team project experiences',
      'PAIR_PROGRAMMING': 'Pair-Programing Opportunities',
      'NO_COMFORT': 'Getting out of my comfort zone',
      'CODE_HELP': 'Help me when I get stuck on a coding problem',
      'MOTIVATION_ACCOUNTABILITY': 'MOTIVATION/ACCOUNTABILITY'
    }
    // check length
    if (excitingAboutChingu.length > maxChecks || excitingAboutChingu.length < minChecks) {
      throw new Error('User selected to few or to many check boxes')
    }
    // check for repeats
    var results = {}
    for (let i = 0; i < excitingAboutChingu.length; i++) {
      if (results[excitingAboutChingu[i]]) {
        throw new Error('Checkbox value was entered more then once')
      }
      results[excitingAboutChingu[i]] = enumToString[excitingAboutChingu[i]]
    }
    // array results
    const resultKeys = Object.keys(results)
    const checkedStrings = []
    for (let i = 0; i < resultKeys.length; i++) {
      checkedStrings.push(results[resultKeys[i]])
    }
    console.log(checkedStrings)
    // check length of chingu value to user
    if (valueOfChinguToUser.length > maxValueStringLength || valueOfChinguToUser.length < minValueStringLength) {
      throw new Error('The input of value to chingu was out of the size limits')
    }
    // start save to MONGODB
    return new ChinguApplicationForm({
      userId,
      excitingAboutChingu: checkedStrings,
      valueOfChinguToUser
    }).save()
  }
}
