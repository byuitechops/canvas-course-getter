const template = require('./template');
let funHelper = require('./functionHelpers.js');

module.exports = {
    type: 'rawlist', //Multiselect? try 
    name: 'filterSelect',
    message: 'Please choose your filter(s) by pressing Spacebar, press Enter once you have finished:',
    when: funHelper.when.whenSelectFilter,
    default: funHelper.defaultChoice.defSet,
    choices: funHelper.choices.selectFilterChoices,
    validate: funHelper.validate.noBlank
}