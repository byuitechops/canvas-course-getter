const inquirer = require('inquirer');

module.exports = async function selectFilters(filterListFull, settings) {
    var answers, questions;
    // build the checkbox question
    questions = getQuestions(settings);
    // ask the question
    answers = await askQuestions(questions);
    //filter off any filters not selected 
    //(cryptic, I know. Filtering a list of filters)
    var filterListModified = filterListFull.filter(filterObject => {
        var match = false;
        //if an answer contains the name of a filter, keep it.
        answers.selectFilters.forEach(answer => {
            if (answer.includes(filterObject.name))
                match = true;
        })
        return match;
    })
    return filterListModified;
};

/*
 * The purpose of this function is simply to return the question object for the
 * internal prompt.
 */
function getQuestions(settings) {
    var question = [{ // selectFilters
        type: 'checkbox',
        name: 'selectFilters',
        message: 'Check any filters you would like to apply:\nPlease note, selecting multiple filters will apply a logical AND (narrowing the number of results)\n',
        choices: [
            'Filter by Sub-Account(s)',
            'Filter by Term',
            //'Filter by Course State(s)',
            //'Filter by Course Types (Blueprint, Blueprint Associated)',
            'Filter by Teacher(s)',
            //'Filter by Courses that contain a certain Enrollment Type(s)',
            //'Filter by Course String value',
        ],
        default: () => {
            if (settings.selectFilters.value != false) {
                return settings.selectFilters.value;
            }
        },
        validate: (answer) => {
            return (answer.length >= 1);
        },
        when: () => {
            return settings.selectFilters.ask
        }
    }];
    return question;
};

/*
 * This function simply runs the prompt with the questions taken from getQuestions.
 */
async function askQuestions(questions) {
    return await inquirer.prompt(questions).then(answers => {
        return answers;
    }).catch((e) => {
        console.log('Prompt Failed', e);
    });
};