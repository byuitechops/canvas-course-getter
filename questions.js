/*
 * This file will contain every question available, in the 
 * order by which they are to be asked. The 'when' attribute 
 * on the individual question(s) will decide which question(s) 
 * will actually be asked. 
 */
const inquirer = require("inquirer");
const questionSelectFilter = require('./question_modules/questionSelectFilter.js');
const questionSelectTeacher = require('./question_modules/questionSelectTeacher.js');
const questionSelectTerm = require('./question_modules/questionSelectTerm.js');

/* --prompt--
 * This function uses the inquirer npm package to receive
 * input from the user in command line.
 */
module.exports = function ask() {
    //requires an array of question objects to ask, separated by commas
    var completeAnswers = inquirer.prompt([{
        questionSelectFilter,
        questionSelectTeacher,
        questionSelectTerm
    }]).then(answers => {
        //TODO return array of API-calls-to-make
        console.log(JSON.stringify(answers, null, "  "));
        return answers;
    });
    console.log(completeAnswers);
    return completeAnswers;
}