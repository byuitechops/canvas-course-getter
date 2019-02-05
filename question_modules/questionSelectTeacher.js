const template = require('./template');
let funHelper = require('./functionHelpers.js');

module.exports = {
    type: 'autocomplete',
    name: 'filterByTeacher',
    message: "Select a value from the list, enter user's name manually, or enter their User ID:",
    when: funHelper.when.whenTeacher,
    default: funHelper.defaultChoice.defSet,
    choices: funHelper.choices.teacherChoices,
    validate: funHelper.validate.noBlank
};