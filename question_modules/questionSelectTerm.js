const template = require('./template')
let funHelper = require('./functionHelpers.js');

module.exports = {
    type: template.type,
    name: template.name,
    message: template.message,
    when: funHelper.when.whenTerm,
    default: funHelper.defaultChoice.defSet,
    choices: funHelper.choices.termChoices,
    validate: funHelper.validate.checkAnswer
};